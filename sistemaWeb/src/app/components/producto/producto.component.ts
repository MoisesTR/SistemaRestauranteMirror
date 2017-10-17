import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Producto} from "../../models/Producto";
import swal from 'sweetalert2'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {

  public producto : Producto;
  public productos: Producto[];
  public mensaje: string
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService : ProductoService
  ) {

  }

  private initConstructorProducto(){
    this.producto = new Producto(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  }

  ngOnInit() {

    $(document).ready(function () {
      $('select[name="datatables_length"]').material_select();
    });

    $(document).ready(function() {
      $('#datatables').DataTable;
    } );

    $(document).ready(function(){

      $('.dropify').dropify();
    });

    $(".selectcategoria").select2({
      maximumSelectionLength: 1
    });

    $(".selectcsubclasificación").select2({
      maximumSelectionLength: 1
    });

    $(".selectproveedor").select2({
      maximumSelectionLength: 1
    });

    $(".selectenvase").select2({
      maximumSelectionLength: 1
    });

    $(".selectempaque").select2({
      maximumSelectionLength: 1
    });

    $(".selectunidadmedida").select2({
      maximumSelectionLength: 1
    });

    $(".selectvalorunidadmedida").select2({
      maximumSelectionLength: 1
    });

    $(".selectestado").select2({
      maximumSelectionLength: 1
    });

    $(".selectcclasificacion").select2({
      maximumSelectionLength: 1
    });

/*    setTimeout(function () {
      $(function() {
        $('#datatableInquilino').DataTable( {
          "paging":   true,
          "ordering": true,
          "info":     true,
          "language": idioma_espanol
        } );
      } );

    },100)*/
  }

  createProducto(){

    /*this.inmueble.idTipoInmueble = $("#tipoInmueble").val();*/
    this._productoService.createProducto(this.producto).subscribe(
      response => {
        if (response) {

         this.initConstructorProducto();

        }
        else {

          /!*  this.status = 'Error al registrarme '+this.usuario.C_CORREO;*!/

        }

      },
      error => {

        console.log(error.message);
      }
    );
    this.limpiarFormulario();
  }

  getProducto(){

  }

  getProductos(){

    this._productoService.getProductos().subscribe(
      response => {
        if(!response.productos){
          console.log('Ha ocurrido un error');
        } else {
          this.productos = response.productos;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  updateProducto(IdProducto,Producto){

  }

  deleteProducto(IdProducto){

    swal({
      title: "Estas seguro(a)?",
      text: "El Producto sera eliminado permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    })
      .then((eliminar) => {
        if (eliminar) {
          this._productoService.deleteProducto(IdProducto).subscribe(
            response => {

              if(!response) {

              }


              swal(
                'Eliminado!',
                'El Producto ha sido eliminado exitosamente',
                'success'
              )
              this.getProductos();


            },
            error => {
              alert('Error');
            }
          );

        } else {

        }
      });

  }

  limpiarFormulario() {
    $("#tipoInmueble").select2();
    $("#tipoInmueble").val(null).trigger("change");
    $('#fecha').datepicker('setDate', null);
    $('#numeroinmueble').val('');
    $('#codpostal').val('');
    $('#descripcion').val('');
  }





}
