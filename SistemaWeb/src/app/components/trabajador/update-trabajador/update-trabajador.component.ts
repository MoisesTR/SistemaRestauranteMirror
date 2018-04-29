import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Sucursal} from '../../../models/Sucursal';
import {Trabajador} from '../../../models/Trabajador';
import {IMyOptions} from '../../../typescripts/pro/date-picker/interfaces';
import {Cargo} from '../../../models/Cargo';
import {Global, opcionesDatePicker} from '../../../services/global';
import {TrabajadorService} from '../../../services/trabajador.service';
import {CargoService} from '../../../services/cargo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UploadService} from '../../../services/upload.service';
import {SucursalService} from '../../../services/sucursal.service';
import {CustomValidators} from '../../../validadores/CustomValidators';
import swal from "sweetalert2";
declare var $:any

@Component({
  selector: 'app-update-trabajador',
  templateUrl: './update-trabajador.component.html',
  styleUrls: ['./update-trabajador.component.css']
})
export class UpdateTrabajadorComponent implements OnInit {

    public trabajador: Trabajador;
    public trabajadores: Trabajador[];
    formUpdateTrabajador : FormGroup;
    public sucursales : Sucursal[];
    public cargos: Cargo[];
    public url: string;
    public myDatePickerOptions: IMyOptions = opcionesDatePicker;

  constructor(
      private _route: ActivatedRoute
      ,private _router: Router
      , private _TrabajadorServicio : TrabajadorService
      , private formBuilderTrabajador : FormBuilder
      , private _sucursalService: SucursalService
      , private _cargoService: CargoService
      , private _uploadService : UploadService
  ) {
      this.url = Global.url;
      this.trabajador  = new Trabajador();

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
      4
      $('.telefono').mask('0000-0000');
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

  onAddSucursal(event){
      this.trabajador.IdSucursal = event.IdSucursal;
  }

  onAddCargo(event){

      this.trabajador.IdCargo =  event.IdCargo;
  }

  initFormTrabajador(){
      this.formUpdateTrabajador = this.formBuilderTrabajador.group({
          'nombreTrabajador' : new FormControl('', [
              Validators.required,
              CustomValidators.espaciosVacios
              , Validators.minLength(5)
              , Validators.maxLength(300)

          ])
          ,'apellido' : new FormControl('', [
              Validators.required,
              CustomValidators.espaciosVacios
              , Validators.minLength(5)
              , Validators.maxLength(300)

          ])
          // ,'cedula' : new FormControl('', [
          //   Validators.required,
          //   CustomValidators.espaciosVacios
          //   , Validators.maxLength(20)
          // ])
          ,'direccion' : new FormControl('', [
              Validators.required,
              CustomValidators.espaciosVacios
              , Validators.minLength(10)
              , Validators.maxLength(300)
          ])
          ,'fechaIngreso' : new FormControl('',Validators.required)
          ,'telefonoPrincipal' : new FormControl('', [
              Validators.required,
              CustomValidators.espaciosVacios
              , Validators.minLength(8)
              , Validators.maxLength(20)
          ])
          ,'telefonoSecundario' : new FormControl('',
              [
                  Validators.minLength(8)
                  , Validators.maxLength(20)
              ])
          ,'sucursal' : new FormControl('', [Validators.required])
          ,'cargo' : new FormControl('', [Validators.required])

      })
  }

  getValuesFormTrabajador(){
      this.trabajador.Nombres = this.formUpdateTrabajador.value.nombreTrabajador;
      this.trabajador.Apellidos = this.formUpdateTrabajador.value.apellido;
      this.trabajador.IdTipoDocumento = 1;
      this.trabajador.Documento = '0020311960028E';
      this.trabajador.Direccion = this.formUpdateTrabajador.value.direccion;
      this.trabajador.FechaIngreso = '2017-02-02';
      this.trabajador.FechaNacimiento =  '2017-02-02';
      this.trabajador.Telefono1 = (this.formUpdateTrabajador.value.telefonoPrincipal).replace("-","");
      this.trabajador.Telefono2 = (this.formUpdateTrabajador.value.telefonoSecundario).replace("-","");;

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

  guardarImagenTrabajador(){

      if(this.filesToUpload != null){

          this._uploadService.makeFileRequest(
              this.url+'trabajadorUploadImage',
              null,null,null,
              [],
              this.filesToUpload,
              'token',
              'image').then((result:any)=>{
              this.trabajador.Imagen = result.image;


          },error =>{
              swal(
                  'Producto',
                  'Ha ocurrido un error en la carga de la imagen, intenta nuevamente!',
                  'error'
              )
          });
      } else {
          swal(
              'Trabajador',
              'La imagen es requerida!',
              'info'
          )
      }
  }

    public filesToUpload: Array<File> = null;
    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }


}
