import { Component, OnInit } from '@angular/core';
import {EnvaseService} from "../../services/envase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClasificacionProducto} from "../../models/ClasificacionProducto";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import {Envase} from "../../models/Envase";

@Component({
  selector: 'app-envase',
  templateUrl: './envase.component.html',
  styleUrls: ['./envase.component.css'],
  providers: [EnvaseService]
})
export class EnvaseComponent implements OnInit {

  public envase : Envase;
  public envases: Envase[];
  public mensaje : string;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _envaseService : EnvaseService
  ) {
    this.envase = new Envase(null,null,null,null);
  }



  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*,select: true*/
    };

    this._envaseService.getEnvases().subscribe(
      response => {
        if(response.envases){
          this.envases = response.envases;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );

  }

  createEnvase(){

  }

  getEnvase(){

  }

  getEnvases(){

  }

  updateEnvase(){

  }

  deleteEnvase(){

  }

}
