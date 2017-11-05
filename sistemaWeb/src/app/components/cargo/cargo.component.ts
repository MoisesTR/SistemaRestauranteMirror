import { Component, OnInit } from '@angular/core';
import {Cargo} from "../../models/Cargo";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import { ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  public cargo : Cargo;
  public cargos: Cargo[];

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor() { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*,select: true*/
    };
  }


  getCargo(){

  }

  updateCargo(){

  }

  deleteCargo(){

  }
}
