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

  settingsDatatable() {

      /*PROPIEDADES GENERALES DE LA DATATABLE*/
      this.dtOptions = <DataTables.Settings>{
          pagingType: 'full_numbers'
          , pageLength: 10
          , language: idioma_espanol
          , 'lengthChange': false
          , responsive: true
          , dom: 'Bfrtip',
          buttons: [
              {
                  text: 'Agregar',
                  key: '1',
                  className: 'btn orange-chang float-right-dt',
                  action: (e, dt, node, config) => {
                      this._router.navigate(['producto-proveedor/add']);
                  }
              }
          ]
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
}
