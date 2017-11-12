import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductoService} from "../../../services/producto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Producto} from "../../../models/Producto";
import { Subject } from 'rxjs/Rx';
import swal from 'sweetalert2';
import {idioma_espanol} from "../../../services/global";
import {DataTableDirective} from "angular-datatables";

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css'],
  providers: [ProductoService]
})
export class ListProductosComponent implements OnInit {

  public producto : Producto;
  public productos: Producto[];
  public habilita: number = 1;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ProductoServicio : ProductoService
  ) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      , searchDelay: 500
      /*,select: true*/
    };

    this._ProductoServicio.getProductos().subscribe(
      response => {
        if(response.productos){
          this.productos = response.productos;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );

  }

  cambio(){

    if ($('#che').is(":checked"))
    {
      this.habilita = 1;
      console.log('esta checked');
    } else {
      this.habilita = 0;
    }

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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  /*CRUD*/
  /**************************************************************************************************************/

  createProducto(){

  }

  updateProducto(IdProducto){

  }

  getProducto(IdProducto){

  }

  getProductos(){

  }

  deleteProducto(){

    swal({
      title: 'Estas seguro?',
      text: "El producto eliminado no podra ser reestablecido!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!',
      cancelButtonText: 'No, Cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function () {
      swal(
        'Eliminado!',
        'El producto ha sido eliminado.',
        'success'
      )
    }, function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelado',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}
