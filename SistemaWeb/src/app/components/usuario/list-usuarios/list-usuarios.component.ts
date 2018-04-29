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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public tituloPantalla : string = 'Usuario';

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _usuarioService : UsuarioService
    , private _trabajadorService : TrabajadorService
  ) { }

  ngOnInit() {
   this.settingsDatatable();
   this.getUsuarios();

  }

 settingsDatatable() {

    /*PROPIEDADES GENERALES DE LA DATATABLE*/
    this.dtOptions = <DataTables.Settings>{
        pagingType: 'full_numbers'
        , pageLength: 10
        , language: idioma_espanol
        , 'lengthChange': false
        , responsive: true
        , dom: 'Bfrtip',
        buttons: [
            {
                text: 'Agregar',
                key: '1',
                className: 'btn orange-chang float-right-dt',
                action: (e, dt, node, config) => {
                    this._router.navigate(['usuario/add']);
                }
            }
        ]
    };
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
