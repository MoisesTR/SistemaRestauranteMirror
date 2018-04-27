import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {DataTableDirective} from 'angular-datatables';
import {ProductoService} from '../../../services/producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Producto} from '../../../models/Producto';
import {idioma_espanol} from '../../../services/global';
import {ProductoProveedorService} from '../../../services/producto-proveedor.service';
import {ProductoProveedor} from '../../../models/ProductoProveedor';
import swal from "sweetalert2";

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


  deleteProductoProveedor(Id){

      // swal({
      //     title: "Estas seguro(a)?",
      //     text: "El proveedor sera eliminado permanentemente!",
      //     type: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Si, Eliminalo!'
      // }).catch(swal.noop).then((eliminar) => {
      //     if (eliminar) {
      //         this._productoProveedorService.deleteProveedor(IdProveedor).subscribe(
      //             response =>{
      //                 if(response.success){
      //                     swal(
      //                         'Eliminado!',
      //                         'El proveedor ha sido eliminado exitosamente',
      //                         'success'
      //                     ).then( () => {
      //                         this.addForm.reset();
      //                         this.getProveedores();
      //                     })
      //                 } else {
      //                     console.log('Ha ocurrido un error, intenta nuevamente')
      //                 }
      //             }, error =>{
      //                 if(error.status = 500){
      //                     console.log('Ha ocurrido un error en el servidor')
      //                 }
      //             }
      //         )
      //
      //     }
      // });
  }
}
