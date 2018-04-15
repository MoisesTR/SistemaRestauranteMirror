import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario.service";
import {TrabajadorService} from "../../../services/trabajador.service";
import {Usuario} from "../../../models/Usuario";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {idioma_espanol} from "../../../services/global";

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {

  public usuarios : Usuario[];
  tOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @ViewChild(DataTableDirective)
  dtOptions: DataTables.Settings = {};

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _usuarioService : UsuarioService
    , private _trabajadorService : TrabajadorService
  ) { }

  ngOnInit() {

    this.dtOptions = <DataTables.Settings>{
        autoWidth: false
        , pagingType: 'full_numbers'
        , pageLength: 10
        , 'lengthChange': false
        , searching: true
        , ordering: true
        , language: idioma_espanol
        , responsive : true
    };
    
    this.getUsuarios();
  }


  getUsuarios(){
    this._usuarioService.getUsuarios().subscribe(
      response =>{
        if(response.usuarios){
          this.usuarios = response.usuarios;
          this.dtTrigger.next();
        }
      },error =>{

      }
    )
  }
}
