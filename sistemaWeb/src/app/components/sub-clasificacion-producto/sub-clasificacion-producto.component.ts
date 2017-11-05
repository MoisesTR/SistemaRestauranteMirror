import { Component, OnInit } from '@angular/core';
import {SubClasificacionProductoService} from "../../services/sub-clasificacion-producto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubClasificacionProducto} from "../../models/SubClasificacionProducto";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";

@Component({
  selector: 'app-sub-clasificacion-producto',
  templateUrl: './sub-clasificacion-producto.component.html',
  styleUrls: ['./sub-clasificacion-producto.component.css'],
  providers: [SubClasificacionProductoService]
})
export class SubClasificacionProductoComponent implements OnInit {

  public subclasificacion : SubClasificacionProducto;
  public subclasificaciones: SubClasificacionProducto[];
  public mensaje : string;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _subClasificacionService : SubClasificacionProductoService
  ) {
    this.initConstructorSubClasificacion();
  }

  private initConstructorSubClasificacion(){
    this.subclasificacion = new SubClasificacionProducto(null,null,null,null,null);
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*select: true*/
    };

    this._subClasificacionService.getSubClasificaciones().subscribe(
      response => {
        if(response.subclasificaciones){
          this.subclasificaciones = response.subclasificaciones;
          console.log(this.subclasificaciones);
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );
  }

  createSubClasificacion(){

  }

  getSubclasificacion(){

  }

  getSubClasificaciones(){

  }

  updateSubClasificacion(){

  }

  deleteSubClasificacion(){

  }

}
