import { Component, OnInit } from '@angular/core';
import {ClasificacionProductoService} from '../../services/clasificacion-producto.service';
import {ActivatedRoute, Router} from "@angular/router";
import {ClasificacionProducto} from "../../models/ClasificacionProducto";

@Component({
  selector: 'app-clasificacion-producto',
  templateUrl: './clasificacion-producto.component.html',
  styleUrls: ['./clasificacion-producto.component.css'],
  providers: [ClasificacionProductoService]
})
export class ClasificacionProductoComponent implements OnInit {

  public clasificacion : ClasificacionProducto;
  public clasificaciones: ClasificacionProducto[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clasificacionService : ClasificacionProductoService
  ) {
    this.initConstructorClasificacion();
  }

  ngOnInit() {
  }

  private initConstructorClasificacion() {
    this.clasificacion = new ClasificacionProducto(null,null,null,null);
  }

  createClasificacion(){

  }

  getClasificacion(){

  }

  getClasificaciones(){

  }

  updateClasificacion(){

  }

  deleteClasificacion(){

  }

}
