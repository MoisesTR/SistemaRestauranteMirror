import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClasificacionProducto} from "../../models/ClasificacionProducto";
import {ClasificacionProductoService} from "../../services/shared/clasificacion-producto.service";
import {ProductoService} from "../../services/shared/producto.service";
import {Producto} from "../../models/Producto";
import {Global} from "../../services/shared/global";
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

  getProductos(){
    this._productoService.getProductos().subscribe(
      response =>{
        if(response.productos){
          this.productos = response.productos;
          if(this.productos.length == 0)
            this.productos = null
        }
      }, error =>{

      }
    )
  }
}
