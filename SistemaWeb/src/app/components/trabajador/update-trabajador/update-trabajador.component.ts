import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Sucursal} from '../../../models/Sucursal';
import {Trabajador} from '../../../models/Trabajador';
import {IMyOptions} from '../../../typescripts/pro/date-picker/interfaces';
import {Cargo} from '../../../models/Cargo';
import {CARPETA_PRODUCTOS, CARPETA_TRABAJADORES, Global, opcionesDatePicker} from '../../../services/global';
import {TrabajadorService} from '../../../services/trabajador.service';
import {CargoService} from '../../../services/cargo.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UploadService} from '../../../services/upload.service';
import {SucursalService} from '../../../services/sucursal.service';
import {CustomValidators} from '../../../validadores/CustomValidators';
import swal from "sweetalert2";
import {TipoDocumento} from '../../../models/TipoDocumento';
import {isNull} from "util";
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
    public removioImagen : boolean = false;
    public tiposDocumento : TipoDocumento [];
  constructor(
      private _route: ActivatedRoute
      ,private _router: Router
      , private _trabajadorService : TrabajadorService
      , private formBuilderTrabajador : FormBuilder
      , private _sucursalService: SucursalService
      , private _cargoService: CargoService
      , private _uploadService : UploadService
  ) {
      this.url = Global.url;
      this.trabajador  = new Trabajador();

      this.getTiposDocumentos();
      this.getTrabajador();
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

      });
      4
      $('.telefono').mask('0000-0000');
      this.initFormTrabajador();
      this.getSucursales();
      this.getTrabajador();

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

  getTrabajador(){
    this._route.params.forEach((params: Params)=>{

        let id = params['id'];
        this.trabajador.IdTrabajador = id;

        this._trabajadorService.getTrabajador(id).subscribe(
            response =>{
                if(response.trabajador){
                    this.trabajador = response.trabajador;

                    //Inicializar componentes de la vista
                    $(document).ready(()=>{

                        var imagenTrabajador =  this.url + 'getImagen/'+ CARPETA_TRABAJADORES + '/' + this.trabajador.Imagen;
                        var drEvent;

                        if(this.trabajador.Imagen.length > 0) {
                            drEvent = $('.dropify').dropify({
                                defaultFile: imagenTrabajador
                            });

                            console.log('imagen del trabajador');
                        }  else {
                            drEvent = $('.dropify').dropify();
                        }

                        drEvent.on('dropify.afterClear', (event, element) => {
                            this.removioImagen = true;
                            this.filesToUpload = null;
                        });

                    });
                    this.inicializarValoresFormularioTrabajador();
                } else {
                    // this._router.navigate(['/producto/list']);
                }
            }, error =>{

            }
        )
    });
  }

  inicializarValoresFormularioTrabajador(){
        this.formUpdateTrabajador.controls['nombreTrabajador'].setValue(this.trabajador.Nombres);
        this.formUpdateTrabajador.controls['apellido'].setValue(this.trabajador.Apellidos);
        this.formUpdateTrabajador.controls['fechaNacimiento'].setValue(this.trabajador.FechaNacimiento);
        this.formUpdateTrabajador.controls['fechaIngreso'].setValue(this.trabajador.FechaIngreso);
        this.formUpdateTrabajador.controls['documentoTrabajador'].setValue(this.trabajador.Documento);
        this.formUpdateTrabajador.controls['telefonoPrincipal'].setValue(this.trabajador.Telefono1);
        this.formUpdateTrabajador.controls['telefonoSecundario'].setValue(this.trabajador.Telefono2);
        this.formUpdateTrabajador.controls['direccion'].setValue(this.trabajador.Direccion);
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

  getTiposDocumentos() {

    this._trabajadorService.getTiposDocumento().subscribe(
        response => {
            if(response.documentos) {
                this.tiposDocumento = response.documentos;
            }
        }, error =>{

        }, () => {

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

    public filesToUpload: Array<File> = null;

  fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}
