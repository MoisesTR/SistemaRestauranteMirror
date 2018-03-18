import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClasificacionProducto} from "../../models/ClasificacionProducto";
import {ClasificacionProductoService} from "../../services/clasificacion-producto.service";
import {ProductoService} from "../../services/producto.service";
import {Producto} from "../../models/Producto";
import {Global} from "../../services/global";
declare var $:any;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  public clasificaciones: ClasificacionProducto[];
  public productos: Producto[];
  public url: string;
  public buscando;
  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _clasificaionService: ClasificacionProductoService
    , private _productoService: ProductoService
  ) {


  }

  ngOnInit() {

    this.url = Global.url;
    this.getProductos();
  }

  prueba(){

  }


  carga(){
    console.log('hola');
  }


  getProductos(){
    this._productoService.getProductos().subscribe(
      response =>{
        if(response.productos){
          this.productos = response.productos;
          if(this.productos.length == 0)
            this.productos = null
          console.log(this.productos)
        }
      }, error =>{

      }
    )
  }
}
