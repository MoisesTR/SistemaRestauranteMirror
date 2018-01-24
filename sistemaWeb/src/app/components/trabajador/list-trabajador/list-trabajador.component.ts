import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {ActivatedRoute, Router} from "@angular/router";
import {TrabajadorService} from "../../../services/trabajador.service";
import {idioma_espanol} from "../../../services/global";
import {Trabajador} from "../../../models/Trabajador";

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
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _trabajadorService: TrabajadorService
  ) { }

  ngOnInit() {

    this.dtOptions = <DataTables.Settings>{
      pagingType: 'full_numbers'
      , pageLength: 10
      , 'lengthChange': false
      , language: idioma_espanol
      /*,select: true*/
    };


    this.getTrabajadores();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  getTrabajadores(){

    this._trabajadorService.getTrabajadores().subscribe(
      response =>{
        if(response.trabajadores){
          this.trabajadores = response.trabajadores;
        } else {

        }
      }, error => {

      }
    )
  }

  getTrabajador(){

  }

  deleteTrabajador(IdTrabajador){

  }




}
