import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Sucursal} from '../../../models/Sucursal';
import {Trabajador} from '../../../models/Trabajador';
import {Cargo} from '../../../models/Cargo';
import {CARPETA_TRABAJADORES, Global, opcionesDatePicker} from '../../../services/shared/global';
import {TrabajadorService} from '../../../services/shared/trabajador.service';
import {CargoService} from '../../../services/shared/cargo.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UploadService} from '../../../services/shared/upload.service';
import {SucursalService} from '../../../services/shared/sucursal.service';
import {CustomValidators} from '../../../validadores/CustomValidators';
import swal from 'sweetalert2';
import {TipoDocumento} from '../../../models/TipoDocumento';
import {Utils} from '../../Utils';
import {IMyOptions} from 'ng-uikit-pro-standard';

declare var $: any;

@Component({
  selector: 'app-update-trabajador',
  templateUrl: './update-trabajador.component.html',
  styleUrls: ['./update-trabajador.component.css']
})
export class UpdateTrabajadorComponent implements OnInit {

    public trabajador: Trabajador;
    public trabajadores: Trabajador[];
    formUpdateTrabajador: FormGroup;
    public sucursales: Sucursal[];
    public cargos: Cargo[];
    public url: string;
    public myDatePickerOptions: IMyOptions = opcionesDatePicker;
    public removioImagen: boolean;
    public tiposDocumento: TipoDocumento [];
    public filesToUpload: Array<File> = null;

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _trabajadorService: TrabajadorService
      , private formBuilderTrabajador: FormBuilder
      , private _sucursalService: SucursalService
      , private _cargoService: CargoService
      , private _uploadService: UploadService
  ) {
      this.url = Global.url;
      this.trabajador  = new Trabajador();

      this.getTiposDocumentos();
      this.getTrabajador();
      this.getCargos();
  }

  ngOnInit() {

      $(document).ready(function() {

          $('.cedula').mask('000-ZX0000-0000A', {'translation': {
                  A: {pattern: /[A-Za-z]/},
                  Z: {pattern: /[0-3]/},
                  X: {pattern: /[0-9]/},
              }
          });

      });

      $('.telefono').mask('0000-0000');
      this.initFormTrabajador();
      this.getSucursales();
      this.getTrabajador();
      this.removioImagen = false;

  }
  initFormTrabajador() {
      this.formUpdateTrabajador = this.formBuilderTrabajador.group({
              'nombreTrabajador' : new FormControl('', [
                  Validators.required,
                  CustomValidators.nospaceValidator
                  , Validators.minLength(2)
                  , Validators.maxLength(300)

              ])
              , 'apellido' : new FormControl('', [
                  Validators.required,
                  CustomValidators.nospaceValidator
                  , Validators.minLength(3)
                  , Validators.maxLength(300)

              ])
              , 'fechaNacimiento' : new FormControl('', [
                  Validators.required,
                  CustomValidators.fechaNacimientoTrabajador

              ])
              , 'fechaIngreso' : new FormControl('', [
                  Validators.required,
                  CustomValidators.mayorFechaActual
              ])
              , 'documentoTrabajador' : new FormControl('', [
                  Validators.required,
                  CustomValidators.nospaceValidator
              ])
              , 'tipoDocumento' : new FormControl('', [
                  Validators.required
              ])
              , 'telefonoPrincipal' : new FormControl('', [
                  Validators.required
                  , CustomValidators.nospaceValidator
                  , Validators.minLength(9)
                  , Validators.maxLength(9)

              ])
              , 'telefonoSecundario' : new FormControl('', [
                  Validators.minLength(9)
                  , Validators.maxLength(9)
              ])
              , 'sucursal' : new FormControl('', [Validators.required])
              , 'cargo' : new FormControl('', [Validators.required])
              , 'direccion' : new FormControl('', [
                  Validators.required,
                  CustomValidators.nospaceValidator
                  , Validators.minLength(5)
                  , Validators.maxLength(300)
              ])
          }
      );
  }

  getValuesFormTrabajador() {
      this.trabajador.Nombres = this.formUpdateTrabajador.value.nombreTrabajador;
      this.trabajador.Apellidos = this.formUpdateTrabajador.value.apellido;
      this.trabajador.Documento = this.formUpdateTrabajador.value.documentoTrabajador;
      this.trabajador.Direccion = this.formUpdateTrabajador.value.direccion;
      this.trabajador.FechaIngreso = this.formUpdateTrabajador.value.fechaIngreso;
      this.trabajador.FechaNacimiento =  this.formUpdateTrabajador.value.fechaNacimiento;
      this.trabajador.Telefono1 = this.formUpdateTrabajador.value.telefonoPrincipal != null ? this.formUpdateTrabajador.value.telefonoPrincipal.replace('-', '') : '';
      this.trabajador.Telefono2 = this.formUpdateTrabajador.value.telefonoSecundario != null ? (this.formUpdateTrabajador.value.telefonoSecundario).replace('-', '') : '';
  }

  getSucursales() {
      this._sucursalService.getSucursales().subscribe(
          response => {
              if (response.sucursales) {
                  this.sucursales = response.sucursales;
              } else {

              }
          }, error => {

          }
      );
  }

  getCargos() {
      this._cargoService.getCargos().subscribe(
          response => {
              if (response.cargos) {
                  this.cargos = response.cargos;
              }
          }, error => {

          }
      );
  }

  updateTrabajador() {

      this.getValuesFormTrabajador();

      this._trabajadorService.updateTrabajador(this.trabajador).subscribe(
          response => {
              if (response.success) {
                  swal(
                      'Trabajador',
                      'El trabajador ha sido actualizado exitosamente!',
                      'success'
                  ).then(() => {
                      this.formUpdateTrabajador.reset();
                      this._router.navigate(['/trabajador']);
                  });
              }
          }, error => {
              Utils.showMsgError(Utils.msgError(error), 'Trabajador');
          }
      );
  }

  getTrabajador() {
    this._route.params.forEach((params: Params) => {

        const id = params['id'];
        this.trabajador.IdTrabajador = id;

        this._trabajadorService.getTrabajador(id).subscribe(
            response => {
                if (response.trabajador) {
                    this.trabajador = response.trabajador;

                    // Inicializar componentes de la vista
                    $(document).ready(() => {

                        const imagenTrabajador =  this.url + 'getImagen/' + CARPETA_TRABAJADORES + '/' + this.trabajador.Imagen;
                        let drEvent;

                        if (this.trabajador.Imagen.length > 0) {
                            drEvent = $('.dropify').dropify({
                                defaultFile: imagenTrabajador
                            });
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
            }, error => {

            }
        );
    });
  }

  inicializarValoresFormularioTrabajador() {
        this.formUpdateTrabajador.controls['nombreTrabajador'].setValue(this.trabajador.Nombres);
        this.formUpdateTrabajador.controls['apellido'].setValue(this.trabajador.Apellidos);
        this.formUpdateTrabajador.controls['fechaNacimiento'].setValue(this.trabajador.FechaNacimiento);
        this.formUpdateTrabajador.controls['fechaIngreso'].setValue(this.trabajador.FechaIngreso);
        this.formUpdateTrabajador.controls['documentoTrabajador'].setValue(this.trabajador.Documento);
        this.formUpdateTrabajador.controls['telefonoPrincipal'].setValue(this.trabajador.Telefono1);
        this.formUpdateTrabajador.controls['telefonoSecundario'].setValue(this.trabajador.Telefono2);
        this.formUpdateTrabajador.controls['direccion'].setValue(this.trabajador.Direccion);
  }

  guardarImagenTrabajador() {

      if ( this.filesToUpload === null && !this.removioImagen) {
          this.updateTrabajador();

      } else {
          if (this.filesToUpload != null && !this.removioImagen) {
              this._uploadService.makeFileRequest(
                  this.url + 'uploadImage',
                  CARPETA_TRABAJADORES
                  , this.trabajador.Imagen
                  , this.removioImagen,
                  [],
                  this.filesToUpload,
                  'token',
                  'image').then((result: any) => {
                  this.trabajador.Imagen = result.image;
                  this.updateTrabajador();

              }, error => {
                  Utils.msgErrorImage(error);
              });
          } else {

              Utils.showMsgInfo('La imagen es requerida', 'Trabajador');
          }
      }

  }

  getTiposDocumentos() {

    this._trabajadorService.getTiposDocumento().subscribe(
        response => {
            if (response.documentos) {
                this.tiposDocumento = response.documentos;
            }
        }, error => {

        }, () => {

        }
    );
  }

  onChangeSucursal(event) {

        if (event === null) {
            this.trabajador.IdSucursal = null;
        } else {
            this.trabajador.IdSucursal = event.IdSucursal;
        }
  }

  onChangeCargo(event) {

        if (event === null) {
            this.trabajador.IdCargo = null;
        } else {
            this.trabajador.IdCargo =  event.IdCargo;
        }

  }

  onChangeTipoDocumento(event) {

        if (event === null) {
            this.trabajador.IdTipoDocumento = null;
        } else {
            this.trabajador.IdTipoDocumento = event.IdTipoDocumento;
        }
  }

  fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.removioImagen = false;
  }

}
