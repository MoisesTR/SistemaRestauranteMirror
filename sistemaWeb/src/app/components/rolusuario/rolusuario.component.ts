import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {idioma_espanol} from "../../services/global";
import {RolUsuario} from "../../models/RolUsuario";

@Component({
  selector: 'app-rolusuario',
  templateUrl: './rolusuario.component.html',
  styleUrls: ['./rolusuario.component.css']
})
export class RolusuarioComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  public rol: RolUsuario;
  public roles: RolUsuario[];

  constructor() {

    this.rol = new RolUsuario(null,null,null,null);
  }


  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*,select: true*/
    };

  }

  getRol(){

  }

  getRoles(){

  }

  updateRol(){

  }

  showModalUpdateRol(){

  }

  deleteRol(){

  }

}
