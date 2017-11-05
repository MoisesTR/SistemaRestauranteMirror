import { Component, OnInit } from '@angular/core';
import { TrabajadorService } from '../../services/trabajador.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Trabajador} from "../../models/Trabajador";
declare var $:any
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
    this.trabajador = new Trabajador(null,null,null,null,null,null,null,null,null,null,null);
  }

  ngOnInit() {

    $(document).ready(function(){

      $('.dropify').dropify();
    });

    $('.cedula').mask('000-000000-0000A',{'translation': {
        A: {pattern: /[A-Za-z0-9]/},
      }
    });


    $(".selectcargo").select2();
    $(".selectsucursales").select2();


    $(document).ready(function(){
      var date = new Date();
      var currentMonth = date.getMonth();
      var currentDate = date.getDate();
      var currentYear = date.getFullYear();

      $('.datepicker').pickadate({

        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'],
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Cerrar',
        closeOnSelect: false,
        closeOnClear: false,
        selectMonths: false,
        selectYears: false,
        firstDay: true,
        min: new Date(currentYear - 50 , 1, 1),
        max: new Date(currentYear, currentMonth, currentDate),
        format: 'yyyy-mm-dd'
      });
    });

  }

}
