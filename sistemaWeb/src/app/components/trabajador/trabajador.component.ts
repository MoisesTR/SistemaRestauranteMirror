import { Component, OnInit } from '@angular/core';
import { TrabajadorService } from '../../services/trabajador.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Trabajador} from "../../models/Trabajador";
@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css'],
  providers: [TrabajadorService]
})
export class TrabajadorComponent implements OnInit {

  public trabajador: Trabajador;
  public trabajadores: Trabajador[];

  constructor(
  	private _route: ActivatedRoute,
    private _router: Router,
  	private _TrabajadorServicio : TrabajadorService
  	) {


       this._TrabajadorServicio.getTrabajadores().subscribe(

      response=>{

      if(response.trabajadores){
        this.trabajadores = response.trabajadores;
      }
    },error =>{

    }

    )
  }

  private initConstructorTrabajador(){
    this.trabajador = new Trabajador(null,null,null,null,null,null,null,null,null,null);
  }

  ngOnInit() {
  }

}
