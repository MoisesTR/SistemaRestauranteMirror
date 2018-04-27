import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {DataTableDirective} from 'angular-datatables';
import {ProductoService} from '../../../services/producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Producto} from '../../../models/Producto';
import {idioma_espanol} from '../../../services/global';
import {ProductoProveedorService} from '../../../services/producto-proveedor.service';
import {ProductoProveedor} from '../../../models/ProductoProveedor';

@Component({
  selector: 'app-list-producto-proveedor',
  templateUrl: './list-producto-proveedor.component.html',
  styleUrls: ['./list-producto-proveedor.component.css']
})
export class ListProductoProveedorComponent implements OnInit {

  public productos : Producto[];
  public productosProveedores : ProductoProveedor[];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public mostrarModal : boolean = false;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _productoService  : ProductoService
    , private _productoProveedorService : ProductoProveedorService

  ) { }

  ngOnInit() {

    this.settingsDatatable();
    this.getProductosProveedor();

  }


  settingsDatatable(){

    this.dtOptions = <DataTables.Settings>{
      autoWidth: false
      , pagingType: 'full_numbers'
      , pageLength: 10
      , 'lengthChange': false
      , searching: true
      , ordering: true
      , language: idioma_espanol
      , responsive : true
    };
  }

  getProductosProveedor(){
    this._productoProveedorService.getProductoProveedores().subscribe(
        response =>{

          if(response.productos){
            this.productosProveedores = response.productos;
            this.dtTrigger.next();
          }
        }, error =>{

        }, () =>{

      }
    )
  }

  // valorModal(event: boolean){
  //   this.mostrarModal = false;
  // }
  //
  // clicks(){
  //   this.mostrarModal = true;
  // }
}
