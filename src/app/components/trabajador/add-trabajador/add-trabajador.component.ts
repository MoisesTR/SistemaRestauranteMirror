import {Component, OnInit, ViewChild} from '@angular/core';
import {Trabajador} from '../../../models/Trabajador';
import {ActivatedRoute, Router} from '@angular/router';
import {TrabajadorService} from '../../../services/shared/trabajador.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SucursalService} from '../../../services/shared/sucursal.service';
import {Sucursal} from '../../../models/Sucursal';
import {CargoService} from '../../../services/shared/cargo.service';
import {Cargo} from '../../../models/Cargo';
import swal from 'sweetalert2';
import {UploadService} from '../../../services/shared/upload.service';
import {CARPETA_TRABAJADORES, Global, opcionesDatePicker} from '../../../services/shared/global';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Utils} from '../../Utils';
import {TipoDocumento} from '../../../models/TipoDocumento';
import {IMyOptions, ModalDirective} from 'ng-uikit-pro-standard';

declare var $: any;

@Component({
  selector: 'app-add-trabajador',
  templateUrl: './add-trabajador.component.html',
  styleUrls: ['./add-trabajador.component.css']
})
export class AddTrabajadorComponent implements OnInit {

  public trabajador: Trabajador;
  public trabajadores: Trabajador[];
  formAddTrabajador: FormGroup;
  public sucursales: Sucursal[];
  public cargos: Cargo[];
  public tiposDocumento: TipoDocumento [];
  public url: string;
  public myDatePickerOptions: IMyOptions = opcionesDatePicker;
  public tituloPantalla = 'Trabajador';
  public filesToUpload: Array<File>;

  @ViewChild('modalUsuario') modalUsuario: ModalDirective;

    constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _TrabajadorService: TrabajadorService
    , private formBuilderAddTrabajador: FormBuilder
    , private _sucursalService: SucursalService
    , private _cargoService: CargoService
    , private _uploadService: UploadService
  ) {
    this.url = Global.url;
    this.trabajador  = new Trabajador();

    this.getTrabajadores();
    this.getCargos();
  }

  ngOnInit() {

      $(document).ready(function() {

          $('.letras').keypress(function (key) {
              if ((key.charCode < 97 || key.charCode > 122) // letras mayusculas
                  && (key.charCode < 65 || key.charCode > 90) // letras minusculas
                  && (key.charCode !== 45) // retroceso
                  && (key.charCode !== 241) // ñ
                  && (key.charCode !== 209) // Ñ
                  && (key.charCode !== 32) // espacio
                  && (key.charCode !== 225) // á
                  && (key.charCode !== 233) // é
                  && (key.charCode !== 237) // í
                  && (key.charCode !== 243) // ó
                  && (key.charCode !== 250) // ú
                  && (key.charCode !== 193) // Á
                  && (key.charCode !== 201) // É
                  && (key.charCode !== 205) // Í
                  && (key.charCode !== 211) // Ó
                  && (key.charCode !== 218) // Ú

              ) {
                  return false;
              }
          });
          $('.dropify').dropify();
      });

    $('.telefono').mask('0000-0000');

    this.initFormTrabajador();
    this.getSucursales();
    this.getTiposDocumentos();

  }


  getTrabajadores() {

    this._TrabajadorService.getTrabajadores().subscribe(
      response => {
        if (response.trabajadores) {
          this.trabajadores = response.trabajadores;
        }
      }, error => {
          Utils.showMsgError(Utils.msgError(error));
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
          this.formAddTrabajador.controls['documentoTrabajador'].setValue('');
          if (event.IdTipoDocumento === 1) {
              this.formAddTrabajador.controls['documentoTrabajador'].setValidators([
                  Validators.required,
                  CustomValidators.nospaceValidator,
                  Validators.maxLength(15)
              ]);
          } else {
              this.formAddTrabajador.controls['documentoTrabajador'].setValidators([
                  Validators.required,
                  CustomValidators.nospaceValidator,
                  Validators.maxLength(10)
              ]);
          }
      }
  }

  initFormTrabajador() {
    this.formAddTrabajador = this.formBuilderAddTrabajador.group({
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
          CustomValidators.nospaceValidator,
            CustomValidators.fechaNacimientoTrabajador

      ])
      , 'fechaIngreso' : new FormControl('', [
          Validators.required,
          CustomValidators.nospaceValidator,
          CustomValidators.mayorFechaActual
      ])
      , 'documentoTrabajador' : new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
          CustomValidators.nospaceValidator,

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
        , Validators.minLength(10)
        , Validators.maxLength(300)
      ])
    }
    );
  }

  getValueFormAddTrabajador() {
    this.trabajador.Nombres = this.formAddTrabajador.value.nombreTrabajador;
    this.trabajador.Apellidos = this.formAddTrabajador.value.apellido;
    this.trabajador.FechaNacimiento =  this.formAddTrabajador.value.fechaNacimiento;
    this.trabajador.FechaIngreso = this.formAddTrabajador.value.fechaIngreso;
    this.trabajador.Documento = this.formAddTrabajador.value.documentoTrabajador.replace('-', '');
    this.trabajador.Telefono1 = (this.formAddTrabajador.value.telefonoPrincipal).replace('-', '');
    this.trabajador.Telefono2 = (this.formAddTrabajador.value.telefonoSecundario).replace('-', '');
    this.trabajador.Direccion = this.formAddTrabajador.value.direccion;
  }

  createTrabajador() {
    this.getValueFormAddTrabajador();

    this._TrabajadorService.createTrabajador(this.trabajador).subscribe(
      response => {
        if (response.IdTrabajador) {
          swal(
            'Trabajador',
            'El trabajador ha sido creado exitosamente!',
            'success'
          ).then(() => {
              this.modalUsuario.show();
          });
        } else {
          Utils.showMsgInfo('Ha ocurrido un error al insertar el trabajador, intentalo nuevamente', this.tituloPantalla);
        }
      }, error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);

      }, () => {
        this.formAddTrabajador.reset();
      }
    );
  }

  getSucursales() {
    this._sucursalService.getSucursales().subscribe(
      response => {
        if (response.sucursales) {
          this.sucursales = response.sucursales;
        } else {

        }
      }, error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
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
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }

  guardarImagenTrabajador() {

    if (this.filesToUpload != null) {
      this._uploadService.makeFileRequest(
        this.url + 'uploadImage/'
        , CARPETA_TRABAJADORES
        , ''
        , false
        , []
        , this.filesToUpload
        , 'token'
        , 'image').then((result: any) => {
        this.trabajador.Imagen = result.image;
        this.createTrabajador();
      }, error => {
          Utils.msgErrorImage(error);
      });
    } else {
        Utils.showMsgInfo('La imagen del trabajador es requerida', this.tituloPantalla);
    }

  }

  getTiposDocumentos() {

    this._TrabajadorService.getTiposDocumento().subscribe(
        response => {
          if (response.documentos) {
            this.tiposDocumento = response.documentos;
          }
        }, error => {

        }, () => {

        }
    );
  }

  fileChangeEvent(fileInput: any) {
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
