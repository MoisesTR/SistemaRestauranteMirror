import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClasificacionProducto} from "../../models/ClasificacionProducto";
import {ClasificacionProductoService} from "../../services/clasificacion-producto.service";
declare var $:any;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  public clasificaciones: ClasificacionProducto[];
  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _clasificaionService: ClasificacionProductoService
  ) {

    this.getClasificaciones();
  }

  ngOnInit() {
    $(".selectclasificacion").select2({
      maximumSelectionLength: 1
    });
  }

  prueba(){

  }
  getClasificaciones(){

    this._clasificaionService.getClasificaciones().subscribe(

      response =>{
        if(response.clasificaciones){
          this.clasificaciones = response.clasificaciones;
        }
      }, error=>{

      }
    )
  }

  carga(){
    console.log('hola');
  }
}
