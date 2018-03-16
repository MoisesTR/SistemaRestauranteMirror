import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {DataTableDirective} from 'angular-datatables';
import {ProductoService} from '../../../services/producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Producto} from '../../../models/Producto';
import {idioma_espanol} from '../../../services/global';

@Component({
  selector: 'app-list-producto-proveedor',
  templateUrl: './list-producto-proveedor.component.html',
  styleUrls: ['./list-producto-proveedor.component.css']
})
export class ListProductoProveedorComponent implements OnInit {

  public productos : Producto[];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _productoService  : ProductoService

  ) { }

  ngOnInit() {

    this.settingsDatatable();
    this.getProductos();

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
    };
  }
  getProductos(){

    this._productoService.getProductos().subscribe(
      response =>{
        if(response.productos){
          this.productos = response.productos;
          this.dtTrigger.next();
        }
      }
    )
  }
}
