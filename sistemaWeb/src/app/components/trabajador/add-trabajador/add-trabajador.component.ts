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
import {UploadService} from '../../../services/upload.service';
import {Global} from '../../../services/global';
import {CustomValidators} from '../../../validadores/CustomValidators';
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
  public url: string;
  constructor(
    private _route: ActivatedRoute
    ,private _router: Router
    , private _TrabajadorServicio : TrabajadorService
    , private formBuilderAddTrabajador : FormBuilder
    , private _sucursalService: SucursalService
    , private _cargoService: CargoService
    , private _uploadService : UploadService
  ) {
    this.url = Global.url;
    this.trabajador  = new Trabajador(null,null,null,null,null,null,null,null,null,null,null,null,null)

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
        min: new Date(currentYear , 0, 1),
        max: new Date(currentYear, currentMonth, currentDate),
        format: 'yyyy-mm-dd'
      });
    });

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
    this.formAddTrabajador = this.formBuilderAddTrabajador.group({
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
      ,'cedula' : new FormControl('', [
        Validators.required,
        CustomValidators.espaciosVacios
        , Validators.maxLength(20)
      ])
      ,'direccion' : new FormControl('', [
        Validators.required,
        CustomValidators.espaciosVacios
        , Validators.minLength(10)
        , Validators.maxLength(300)
      ])
      ,'fechaNacimiento' : new FormControl('')
      ,'fechaIngreso' : new FormControl('', )
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

  getValueFormAddTrabajador(){
    this.trabajador.Nombres = this.formAddTrabajador.value.nombreTrabajador;
    this.trabajador.Apellidos = this.formAddTrabajador.value.apellido;
    this.trabajador.NumeroCedula = this.formAddTrabajador.value.cedula;
    this.trabajador.Direccion = this.formAddTrabajador.value.direccion;
    this.trabajador.FechaIngreso = $('#FechaIngreso').val();
    this.trabajador.FechaNacimiento = $('#FechaNacimiento').val();
    this.trabajador.Telefono1 = (this.formAddTrabajador.value.telefonoPrincipal).replace("-","");
    this.trabajador.Telefono2 = (this.formAddTrabajador.value.telefonoSecundario).replace("-","");;

    console.log(this.trabajador)

  }

  createTrabajador(){

    this.getValueFormAddTrabajador();
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
        console.log(error)
        swal(
          'Trabajador',
          error,
          'error'
        )
      }, () =>{
        this.formAddTrabajador.reset;
      }
    )

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
        [],
        this.filesToUpload,
        'token',
        'image').then((result:any)=>{
        this.trabajador.Imagen = result.image;
        console.log(result.image)
        this.createTrabajador();


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

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}
