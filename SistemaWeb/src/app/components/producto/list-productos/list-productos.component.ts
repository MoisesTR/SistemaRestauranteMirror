import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductoService} from "../../../services/producto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Producto} from "../../../models/Producto";
import { Subject } from 'rxjs/Rx';
import swal from 'sweetalert2';
import {idioma_espanol} from "../../../services/global";
import {DataTableDirective} from "angular-datatables";
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css'],
  providers: [ProductoService]
})
export class ListProductosComponent implements OnInit, OnDestroy {


  ngOnDestroy() {
    console.log('La pagina se va a cerrar')
      this.subscription.unsubscribe();
  }

  subscription : Subscription;
  public producto : Producto;
  public productos: Producto[];
  public habilita: number = 1;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ProductoServicio : ProductoService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.dtOptions = <DataTables.Settings>{
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , 'lengthChange': false
      , responsive : true
        , dom: 'Bfrtip',
        buttons: [
            {
                text: 'Agregar Producto',
                key: '1',
                className: 'btn orange-chang float-right-dt',
                action:  (e, dt, node, config) => {
                    this._router.navigate(['producto/add']);
                }
            }
        ]
    };

    this.spinner.show();
    this.getProductos();

  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  getProductos(){

    this.subscription = this._ProductoServicio.getProductos().subscribe(
      response => {
        if(response.productos){
          this.productos = response.productos;
          this.dtTrigger.next();
          this.spinner.hide();
        }
      }, error =>{

      }
    );
  }
  getProductosRender(){

    this._ProductoServicio.getProductos().subscribe(
      response => {
        if(response.productos){
          this.productos = response.productos;
          this.rerender();
        }
      }, error =>{

      }
    );
  }

  eliminarProducto(IdProducto){

    swal({
      title: "Estas seguro(a)?",
      text: "El producto sera eliminado!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).catch(swal.noop).then((eliminar) => {
      if (eliminar) {
        this._ProductoServicio.deleteProducto(IdProducto).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminado  !',
                'El producto ha sido eliminado exitosamente',
                'success'
              ).then(() => {
                this.getProductosRender();

              })
            } else {
              swal(
                'Error inesperado',
                'Ha ocurrido un error en la eliminación, intenta nuevamente!',
                'error'
              )
            }
          }, error =>{
            if(error.status = 500){
              swal(
                'Error inesperado',
                'Ha ocurrido un error en el servidor, intenta nuevamente!',
                'error'
              )
            }
          }
        )

      }
    });
  }

}
