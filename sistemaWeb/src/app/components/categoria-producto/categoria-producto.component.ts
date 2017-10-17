import { Component, OnInit } from '@angular/core';
import { CategoriaProductoService} from '../../services/categoria-producto.service'
import { ActivatedRoute, Router} from "@angular/router";
import { CategoriaProducto } from '../../models/CategoriaProducto';

@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css'],
  providers: [CategoriaProductoService]
})
export class CategoriaProductoComponent implements OnInit {

  public categoriaProducto: CategoriaProducto;
  public categoraisProductos: CategoriaProducto[];
  public mensaje : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoriaProductoServicio : CategoriaProductoService
  ) {
    this.initCategoriaProducto();
  }

  ngOnInit() {
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

  getCategoriaProducto(){

  }

  getCategoriasProductos(){

  }

  updateCategoria(){

  }

  deleteCategoria(){

  }

}
