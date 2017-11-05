import { Component, OnInit } from '@angular/core';
import { CategoriaProductoService} from '../../services/categoria-producto.service'
import { ActivatedRoute, Router} from "@angular/router";
import { CategoriaProducto } from '../../models/CategoriaProducto';
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css'],
  providers: [CategoriaProductoService]
})
export class CategoriaProductoComponent implements OnInit {

  public categoriaProducto: CategoriaProducto;
  public categoriasProductos: CategoriaProducto[];
  public mensaje : string;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoriaProductoServicio : CategoriaProductoService
  ) {
    this.initCategoriaProducto();
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*,select: true*/
    };

    this._categoriaProductoServicio.getCategoriasProductos().subscribe(
      response => {
        if(response.categorias){
          this.categoriasProductos = response.categorias;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );
    console.log(this.categoriasProductos);
  }

  initCategoriaProducto(){
    this.categoriaProducto = new CategoriaProducto(null,null,null,null);
  }


  createCategoriaProducto(){

    this._categoriaProductoServicio.createCategoriaProducto(this.categoriaProducto).subscribe(
      response => {

          if(response.Categoria.IdCategoria) {
            this.mensaje = 'El registro se ha realizado correctamente';
          }
          else {
            this.mensaje = 'Error al registrar el producto';
          }

        this.initCategoriaProducto();
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  getCategoriaProducto(IdCategoria){

    this._categoriaProductoServicio.getCategoriaProducto(IdCategoria).subscribe(
      response => {

        if(!response.categoria){

        } else {
          this.categoriaProducto = response.categoria;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  getCategoriasProductos(){
    this._categoriaProductoServicio.getCategoriasProductos().subscribe(
      response => {

        if(!response.Categorias){
          console.log('Ha ocurrido un error');
        } else {
          this.categoriasProductos = response.categorias;
        }
      },error => {
        console.log(<any>error);
    }
    )
  }

  updateCategoria(){

  }

  deleteCategoria(IdCategoria){

    this._categoriaProductoServicio.deleteCategoriaProducto(IdCategoria).subscribe(
      response => {
        if(response.Categoria){
          console.log('Error interno del servidor');
        }
        this.getCategoriasProductos();
      },
      error =>{

      }
    )
  }

}
