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


  }

  createProducto(){

  }

  getProducto(){

  }

  getProductos(){

  }

  updateProducto(){

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
