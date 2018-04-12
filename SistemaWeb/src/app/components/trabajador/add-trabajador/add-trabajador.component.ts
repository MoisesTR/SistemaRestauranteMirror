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
import {IMyOptions} from '../../../typescripts/pro/date-picker/interfaces';
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
  public myDatePickerOptions: IMyOptions = {
      // Strings and translations
      dayLabels: {su: 'Do', mo: 'Lu', tu: 'Mar', we: 'Mier', th: 'Jue', fr: 'Vier', sa: 'Sab'},
      dayLabelsFull: {su: "Domingo", mo: "Lunes", tu: "Martes", we: "Miercoles", th: "Jueves", fr: "Viernes", sa: "Sabado"},
      monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
      monthLabelsFull: { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" },

      // Buttons
      todayBtnTxt: "Hoy",
      clearBtnTxt: "Limpiar",
      closeBtnTxt: "Cerrar",

      // Format
      dateFormat: 'dd.mm.yyyy',

      // First day of the week
      firstDayOfWeek: 'mo',

      // Year limits
      minYear: 1000,
      maxYear: 9999,

      // Show Today button
      showTodayBtn: true,

      //Show Clear date button
      showClearDateBtn: true,
  };
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

  getValueFormAddTrabajador(){
    this.trabajador.Nombres = this.formAddTrabajador.value.nombreTrabajador;
    this.trabajador.Apellidos = this.formAddTrabajador.value.apellido;
    this.trabajador.NumeroCedula = '0010311960028E';
    this.trabajador.Direccion = this.formAddTrabajador.value.direccion;
    this.trabajador.FechaIngreso = '2017-02-02';
    this.trabajador.FechaNacimiento =  '2017-02-02';
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
        // swal(
        //   'Trabajador',
        //   error,
        //   'error'
        // )
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
