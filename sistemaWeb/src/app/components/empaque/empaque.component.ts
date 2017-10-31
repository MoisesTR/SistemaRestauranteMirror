import { Component, OnInit } from '@angular/core';
import {EmpaqueService} from "../../services/empaque.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Empaque} from "../../models/Empaque";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";

@Component({
  selector: 'app-empaque',
  templateUrl: './empaque.component.html',
  styleUrls: ['./empaque.component.css'],
  providers: [EmpaqueService]
})
export class EmpaqueComponent implements OnInit {

  public empaque: Empaque;
  public empaques: Empaque[];

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _EmpaqueServicio : EmpaqueService
  ) {
    this.empaque = new Empaque(null,null,null,null);
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      /*language: idioma_espanol,
      select: true*/
    };

    this._EmpaqueServicio.getEmpaques().subscribe(
      response => {
        if(response.empaques){
          this.empaques = response.empaques;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );

  }

  createEmpaque(){

  }

  getEmpaque(){

  }

  getEmpaques(){

  }

  updateEmpaque(){

  }

  deleteEmpaque(){

  }

}
