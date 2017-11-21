import { Component, OnInit } from '@angular/core';
import {Trabajador} from "../../../models/Trabajador";
import {ActivatedRoute, Router} from "@angular/router";
import {TrabajadorService} from "../../../services/trabajador.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
declare var $:any

@Component({
  selector: 'app-add-trabajador',
  templateUrl: './add-trabajador.component.html',
  styleUrls: ['./add-trabajador.component.css']
})
export class AddTrabajadorComponent implements OnInit {

  public trabajador: Trabajador;
  public trabajadores: Trabajador[];
  formAddTrabajador : FormGroup;

  constructor(
    private _route: ActivatedRoute
    ,private _router: Router
    , private _TrabajadorServicio : TrabajadorService
    , private formBuilderAddTrabajador : FormBuilder
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

      $('.cedula').mask('000-000000-0000A',{'translation': {
        A: {pattern: /[A-Za-z]/},
      }
      });
      $('.dropify').dropify();

      $(".selectcargo").select2();
      $(".selectsucursales").select2();
      $(".selectoperadoraprincipalTrabajador").select2({
        maximumSelectionLength: 1
      });
      $(".selectoperadorasecundarioTrabajador").select2({
        maximumSelectionLength: 1
      });


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

    this.initFormTrabajador();

  }


  initFormTrabajador(){
    this.formAddTrabajador = this.formBuilderAddTrabajador.group({
      'nombre' : new FormControl('', [Validators.required])
      ,'apellido' : new FormControl('', [Validators.required])
      ,'cedula' : new FormControl('', [Validators.required])
      ,'fechaNacimiento' : new FormControl('', [Validators.required])
      ,'fechaIngreso' : new FormControl('', [Validators.required])
      ,'telefonoPrincipal' : new FormControl('', [Validators.required])
      ,'telefonoSecundario' : new FormControl('', [Validators.required])

    })
  }




}
