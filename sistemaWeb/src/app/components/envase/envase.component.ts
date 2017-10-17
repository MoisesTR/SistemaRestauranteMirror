import { Component, OnInit } from '@angular/core';
import {EnvaseService} from "../../services/envase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClasificacionProducto} from "../../models/ClasificacionProducto";

@Component({
  selector: 'app-envase',
  templateUrl: './envase.component.html',
  styleUrls: ['./envase.component.css'],
  providers: [EnvaseService]
})
export class EnvaseComponent implements OnInit {

  public clasificacion : ClasificacionProducto;
  public clasificaciones: ClasificacionProducto[];
  public mensaje : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _envaseService : EnvaseService
  ) {

  }

  private initConstructorClasificacion(){
    this.clasificacion = new ClasificacionProducto(null,null,null,null);
  }

  ngOnInit() {
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
