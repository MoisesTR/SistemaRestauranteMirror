import {Component, OnInit, ViewChild} from '@angular/core';
import {Trabajador} from '../../../models/Trabajador';
import {ActivatedRoute, Router} from '@angular/router';
import {TrabajadorService} from '../../../services/trabajador.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SucursalService} from '../../../services/sucursal.service';
import {Sucursal} from '../../../models/Sucursal';
import {CargoService} from '../../../services/cargo.service';
import {Cargo} from '../../../models/Cargo';
import swal from 'sweetalert2';
import {UploadService} from '../../../services/upload.service';
import {CARPETA_TRABAJADORES, Global, opcionesDatePicker} from '../../../services/global';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {IMyOptions} from '../../../typescripts/pro/date-picker/interfaces';
import {Utilidades} from '../../Utilidades';
import {isNull} from 'util';
import {TipoDocumento} from '../../../models/TipoDocumento';
import {ModalDirective} from '../../../typescripts/free/modals';

declare var $:any

@Component({
  selector: 'app-add-trabajador',
  templateUrl: './add-trabajador.component.html',
  styleUrls: ['./add-trabajador.component.css']
})
export class AddTrabajadorComponent implements OnInit {

  public trabajador: Trabajador;
  public trabajadores: Trabajador[];
  formUpdateTrabajador : FormGroup;
  public sucursales : Sucursal[];
  public cargos: Cargo[];
  public tiposDocumento : TipoDocumento [];
  public url: string;
  public myDatePickerOptions: IMyOptions = opcionesDatePicker;
  public tituloPantalla : string = 'Trabajador';

  @ViewChild('modalUsuario') modalUsuario : ModalDirective;

    constructor(
    private _route: ActivatedRoute
    ,private _router: Router
    , private _TrabajadorService : TrabajadorService
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

    $(".letras").keypress(function (key) {
        if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
            && (key.charCode < 65 || key.charCode > 90) //letras minusculas
            && (key.charCode != 45) //retroceso
            && (key.charCode != 241) //ñ
            && (key.charCode != 209) //Ñ
            && (key.charCode != 32) //espacio
            && (key.charCode != 225) //á
            && (key.charCode != 233) //é
            && (key.charCode != 237) //í
            && (key.charCode != 243) //ó
            && (key.charCode != 250) //ú
            && (key.charCode != 193) //Á
            && (key.charCode != 201) //É
            && (key.charCode != 205) //Í
            && (key.charCode != 211) //Ó
            && (key.charCode != 218) //Ú

        )return false;
    });

    $('.dropify').dropify();
    });

    $('.telefono').mask('0000-0000');
    this.initFormTrabajador();
    this.getSucursales();
    this.getTiposDocumentos();

  }


  getTrabajadores(){

    this._TrabajadorService.getTrabajadores().subscribe(
      response => {
        if(response.trabajadores){
          this.trabajadores = response.trabajadores;
        }
      }, error =>{

      }
    )
  }

  onChangeSucursal(event){

      if(isNull(event)) {
        this.trabajador.IdSucursal = null;
      } else {
        this.trabajador.IdSucursal = event.IdSucursal;
      }
  }

  onChangeCargo(event){

      if(isNull(event)) {
        this.trabajador.IdCargo = null;
      } else {
        this.trabajador.IdCargo =  event.IdCargo;
      }

  }

  onChangeTipoDocumento(event) {

      if (isNull(event)) {
          this.trabajador.IdTipoDocumento = null;
      } else {
          this.trabajador.IdTipoDocumento = event.IdTipoDocumento;
      }
  }

  initFormTrabajador(){
    this.formUpdateTrabajador = this.formBuilderAddTrabajador.group({
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
      ,'fechaNacimiento' : new FormControl('', [
          Validators.required,
          CustomValidators.espaciosVacios,
            CustomValidators.fechaNacimientoTrabajador

      ])
      ,'fechaIngreso' : new FormControl('', [
          Validators.required,
          CustomValidators.espaciosVacios,
          CustomValidators.mayorFechaActual
      ])
      ,'documentoTrabajador' : new FormControl('', [
          Validators.required,
          CustomValidators.espaciosVacios
      ])
      ,'tipoDocumento' : new FormControl('', [
          Validators.required,
          CustomValidators.espaciosVacios
      ])
       , 'telefonoPrincipal' : new FormControl('', [
            Validators.required
            , CustomValidators.espaciosVacios
            , Validators.minLength(9)
            , Validators.maxLength(9)

        ])
        , 'telefonoSecundario' : new FormControl('', [
            Validators.minLength(9)
            , Validators.maxLength(9)
        ])
      // ,telefonos : new FormGroup({
      //   'telefonoPrincipal' : new FormControl('', [
      //     Validators.required
      //     , CustomValidators.espaciosVacios
      //     , Validators.minLength(9)
      //     , Validators.maxLength(9)
      //
      //   ])
      //   , 'telefonoSecundario' : new FormControl('', [
      //       Validators.minLength(9)
      //       , Validators.maxLength(9)
      //   ])
      // })
      ,'sucursal' : new FormControl('', [Validators.required])
      ,'cargo' : new FormControl('', [Validators.required])
      ,'direccion' : new FormControl('', [
        Validators.required,
        CustomValidators.espaciosVacios
        , Validators.minLength(10)
        , Validators.maxLength(300)
      ])
    }
    );
  }

  getValueFormAddTrabajador(){
    this.trabajador.Nombres = this.formUpdateTrabajador.value.nombreTrabajador;
    this.trabajador.Apellidos = this.formUpdateTrabajador.value.apellido;
    this.trabajador.FechaNacimiento =  this.formUpdateTrabajador.value.fechaNacimiento;
    this.trabajador.FechaIngreso = this.formUpdateTrabajador.value.fechaIngreso;
    this.trabajador.Documento = this.formUpdateTrabajador.value.documentoTrabajador.replace("-","");
    this.trabajador.Telefono1 = (this.formUpdateTrabajador.value.telefonoPrincipal).replace("-","");
    this.trabajador.Telefono2 = (this.formUpdateTrabajador.value.telefonoSecundario).replace("-","");
    this.trabajador.Direccion = this.formUpdateTrabajador.value.direccion;
  }

  createTrabajador(){
    this.getValueFormAddTrabajador();

    this._TrabajadorService.createTrabajador(this.trabajador).subscribe(
      response =>{
        if(response.IdTrabajador){
          swal(
            'Trabajador',
            'El trabajador ha sido creado exitosamente!',
            'success'
          ).then(() => {
              this.modalUsuario.show();
          })
        } else {
          Utilidades.showMsgInfo('Ha ocurrido un error al insertar el trabajador, intentalo nuevamente',this.tituloPantalla);
        }
      }, error =>{
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);

      }, () =>{
        this.formUpdateTrabajador.reset;
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
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
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
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
      }
    )
  }

  guardarImagenTrabajador(){

    if(this.filesToUpload != null){
      this._uploadService.makeFileRequest(
        this.url+'uploadImage/'
        , CARPETA_TRABAJADORES
        ,''
        ,false
        , []
        , this.filesToUpload
        , 'token'
        , 'image').then((result:any)=>{
        this.trabajador.Imagen = result.image;
        this.createTrabajador();
      },error =>{
          Utilidades.msgErrorImage(error);
      });
    } else {
        Utilidades.showMsgInfo('La imagen del trabajador es requerida',this.tituloPantalla);
    }

  }

  getTiposDocumentos() {

    this._TrabajadorService.getTiposDocumento().subscribe(
        response => {
          if(response.documentos) {
            this.tiposDocumento = response.documentos;
          }
        }, error =>{

        }, () => {

        }
    )
  }
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  relacionarTrabajador() {
      this.modalUsuario.hide();
      this._router.navigate(['/usuario/add']);
  }

  listaTrabajadores() {
      this.modalUsuario.hide();
      this._router.navigate(['/trabajador']);
  }

}
