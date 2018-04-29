import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {ActivatedRoute, Router} from "@angular/router";
import {TrabajadorService} from "../../../services/trabajador.service";
import {idioma_espanol} from "../../../services/global";
import {Trabajador} from "../../../models/Trabajador";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list-trabajador',
  templateUrl: './list-trabajador.component.html',
  styleUrls: ['./list-trabajador.component.css']
})
export class ListTrabajadorComponent implements OnInit {


  public trabajador : Trabajador;
  public trabajadores: Trabajador[];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _trabajadorService: TrabajadorService
  ) { }

  ngOnInit() {
    this.settingsDatatable();
    this.getTrabajadores();
  }
  

  getTrabajadores(){

    this._trabajadorService.getTrabajadores().subscribe(
      response =>{
        if(response.trabajadores){
          this.trabajadores = response.trabajadores;
          this.dtTrigger.next();
        } else {

        }
      }, error => {

      }
    )
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
                      this._router.navigate(['trabajador/add']);
                  }
              }
          ]
      };
  }

}
