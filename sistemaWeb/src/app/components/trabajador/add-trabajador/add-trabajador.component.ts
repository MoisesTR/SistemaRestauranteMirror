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
  public optionsSelect2: Select2Options;

  constructor(
    private _route: ActivatedRoute
    ,private _router: Router
    , private _TrabajadorServicio : TrabajadorService
    , private formBuilderAddTrabajador : FormBuilder
    , private _sucursalService: SucursalService
    , private _cargoService: CargoService
  ) {

    this.trabajador  = new Trabajador(null,null,null,null,null,null,null,null,null,null,null)

    this.optionsSelect2 = {
      multiple: true
      , maximumSelectionLength: 1
      , width: '100%'
    }

    this.getTrabajadores()
    this.getCargos();
  }

  ngOnInit() {
    $(document).ready(function(){

      $('.cedula').mask('000-ZX0000-0000A',{'translation': {
          A: {pattern: /[A-Za-z]/},
          Z: {pattern: /[0-3]/},
          X: {pattern: /[0-9]/},
      }
      });
      $('.dropify').dropify();


    });

    this.initFormTrabajador();
    this.getSucursales();

  }

  getTrabajadores(){

    this._TrabajadorServicio.getTrabajadores().subscribe(
      response => {
        if(response.trabajadores){
          this.trabajadores = response.trabajadores;
        }
      }, error =>{

      }
    )
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

  }

  changeSelectSucursal(event){

  }

  changeSelectCargo(event){

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
