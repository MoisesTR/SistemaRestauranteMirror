import { Component, OnInit } from '@angular/core';
import {Trabajador} from "../../../models/Trabajador";
import {ActivatedRoute, Router} from "@angular/router";
import {TrabajadorService} from "../../../services/trabajador.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SucursalService} from "../../../services/sucursal.service";
import {Sucursal} from "../../../models/Sucursal";
import {CargoService} from "../../../services/cargo.service";
import {Cargo} from "../../../models/Cargo";
declare var $:any
import swal from 'sweetalert2';
@Component({
  selector: 'app-add-trabajador',
  templateUrl: './add-trabajador.component.html',
  styleUrls: ['./add-trabajador.component.css']
})
export class AddTrabajadorComponent implements OnInit {

  public trabajador: Trabajador;
  public trabajadores: Trabajador[];
  formAddTrabajador : FormGroup;
  public sucursales : Sucursal[];
  public cargos: Cargo[];

  constructor(
    private _route: ActivatedRoute
    ,private _router: Router
    , private _TrabajadorServicio : TrabajadorService
    , private formBuilderAddTrabajador : FormBuilder
    , private _sucursalService: SucursalService
    , private _cargoService: CargoService
  ) {



    this.trabajador  = new Trabajador(null,null,null,null,null,null,null,null,null,null,null)

    this._TrabajadorServicio.getTrabajadores().subscribe(

      response=>{

        if(response.trabajadores){
          this.trabajadores = response.trabajadores;
        }
      },error =>{

      }

    )

    this.getCargos();
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
        closeOnSelect: true,
        closeOnClear: false,
        selectMonths: true,
        selectYears: true,
        firstDay: true,
        min: new Date(currentYear, 0, 1), //currentMonth es 0 que equivale a Enero
        max: new Date(currentYear, currentMonth, currentDate),
        format: 'yyyy-mm-dd'
      });

      $('.datepickerEdad').pickadate({

        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'],
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Cerrar',
        viewMode: 'months',
        minViewMode: 'months',
        closeOnSelect: true,
        closeOnClear: false,
        selectYears: true,
        selectMonths: true
      });
    });

    this.initFormTrabajador();
    this.getSucursales();

  }


  initFormTrabajador(){
    this.formAddTrabajador = this.formBuilderAddTrabajador.group({
      'nombreTrabajador' : new FormControl('', [Validators.required])
      ,'apellido' : new FormControl('', [Validators.required])
      ,'cedula' : new FormControl('', [Validators.required])
      ,'direccion' : new FormControl('', [Validators.required])
      ,'fechaNacimiento' : new FormControl('', [Validators.required])
      ,'fechaIngreso' : new FormControl('', [Validators.required])
      ,'telefonoPrincipal' : new FormControl('', [Validators.required])
      ,'telefonoSecundario' : new FormControl('', [Validators.required])

    })
  }

  createTrabajador(){


    this.trabajador.Nombres = this.formAddTrabajador.value.nombreTrabajador;
    this.trabajador.Apellidos = this.formAddTrabajador.value.apellido;
    this.trabajador.NumeroCedula = this.formAddTrabajador.value.cedula;
    this.trabajador.Direccion = this.formAddTrabajador.value.direccion;

    if($( ".selectsucursales" ).val()[0] != null){
      this.trabajador.IdSucursal = parseInt($( ".selectsucursales" ).val()[0]);
    }
    this.trabajador.FechaNacimiento = $( "#FechaNacimiento" ).val();
    this.trabajador.FechaIngreso =  $( "#FechaIngreso" ).val();
    if($( ".selectcargo" ).val()[0] != null){
      this.trabajador.IdCargo = parseInt($( ".selectcargo" ).val()[0]);
    }

    this._TrabajadorServicio.createTrabajador(this.trabajador).subscribe(
      response =>{
        if(response.IdTrabajador){
          swal(
            'Trabajador',
            'El trabajador ha sido creado exitosamente!',
            'success'
          ).then(() => {

            this._router.navigate(['/trabajador']);

          })
        } else {
          console.log('Todo mal')
        }
      }, error =>{
        swal(
          'Trabajador',
          'Esta cedula ya esta registrada, intenta con otra!',
          'error'
        )
      }
    )

   console.log(this.trabajador)
  }

  getSucursales(){
    this._sucursalService.getSucursales().subscribe(
      response =>{
        if(response.sucursales){
          this.sucursales = response.sucursales;
        } else {

        }
      }, error=>{

      }
    )
  }

  getCargos(){
    this._cargoService.getCargos().subscribe(
      response =>{
        if(response.cargos){
          this.cargos = response.cargos;
        }
      }, error =>{

      }
    )
  }




}
