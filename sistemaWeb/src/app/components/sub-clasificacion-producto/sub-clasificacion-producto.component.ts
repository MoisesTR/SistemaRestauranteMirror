import { Component, OnInit } from '@angular/core';
import {SubClasificacionProductoService} from "../../services/sub-clasificacion-producto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubClasificacionProducto} from "../../models/SubClasificacionProducto";

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
    this.getSubClasificaciones();
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
