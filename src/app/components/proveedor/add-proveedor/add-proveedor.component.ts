import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PreviousRouteService, ProveedorService} from '@app/core/service.index';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Proveedor} from '@app/models/Proveedor';
import swal from 'sweetalert2';
import {Utils} from '../../Utils';
import {CustomValidators} from '@app/validadores/CustomValidators';
import {TelefonoProveedor} from '@app/models/TelefonoProveedor';
import {ModalDirective} from 'ng-uikit-pro-standard';

declare var $: any;

@Component({
  selector: 'add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddProveedorComponent implements OnInit, AfterViewChecked {

  @ViewChild('modalTelefonos') modalTelefonos: ModalDirective;

  public proveedor: Proveedor;
  public tituloPantalla = 'Proveedor';
  formAddProveedor: FormGroup;
  previousUrl: string;
  public contactos: TelefonoProveedor[];
  public telefonoRequerido: TelefonoProveedor;
  public formAddTelefonos: FormGroup;
  private peticionEnCurso = false;

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _proveedorService: ProveedorService
      , private _formBuilderProveedor: FormBuilder
      , private previousRouteService: PreviousRouteService
      , private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
      this.previousUrl = this.previousRouteService.getPreviousUrl();
      this.proveedor = new Proveedor();
      this.telefonoRequerido = new TelefonoProveedor();
      this.contactos = [];
      this.contactos.push(this.telefonoRequerido);

      $(document).ready(function() {

          $('.letras').keypress(function (key) {
              if ((key.charCode < 97 || key.charCode > 122) // letras mayusculas
                  && (key.charCode < 65 || key.charCode > 90) // letras minusculas
                  && (key.charCode !== 45) // .
                  && (key.charCode !== 46) // -
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
      });

      this.initFormAdd();
      this.initFormTelefonos();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  agregarTelefono() {
      if (this.validarAgregarNuevoTelefonoFormulario()) {
          const telefonoProveedor: TelefonoProveedor = new TelefonoProveedor();
          this.contactos.push(telefonoProveedor);
      }
  }

  createProveedor() {
      this.peticionEnCurso = false;

      if (this.validarTelefonos()) {
          this.getDatosProveedor();
          this._proveedorService.createProveedor(this.proveedor).subscribe(
              response => {
                  if (response.IdProveedor) {
                      this.contactos.forEach( (value, index) => {
                          value.IdProveedor = response.IdProveedor;
                           this.createTelefonoProveedor(value);
                      });
                    this.mensajeCreacionProveedor();
                  } else {
                      Utils.showMsgInfo('Ha ocurrido un error al insertar el proveedor, intentalo nuevamente', this.tituloPantalla);
                  }
              }, error => {
                  Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
              }, () => {
                  this.peticionEnCurso = false;
              }
          );
      } else {
        this.peticionEnCurso = false;
      }
  }

  mensajeCreacionProveedor() {
      swal(
          'Proveedor',
          'El proveedor ha sido creado exitosamente!',
          'success'
      ).then(() => {
          this.formAddProveedor.reset();
          this.proveedor = new Proveedor();
          if (this.previousUrl === '/factura/add') {
              this._router.navigate(['/producto/add']);
          } else if (this.previousUrl === '/producto/add') {
              this._router.navigate([this.previousUrl]);
          } else {
              this._router.navigate(['/proveedor']);
          }
      });
  }

  createTelefonoProveedor(telefono: TelefonoProveedor) {
      this._proveedorService.createTelefonoProveedor(telefono).subscribe(
          response => {
              if (response.IdTelefono) {
              } else {
                  Utils.showMsgInfo('Ha ocurrido un error al insertar el telefono del proveedor');
              }

          }, error => {
            Utils.showMsgError(Utils.msgError(error));
          }, () => {
          }
      );
  }

  getDatosProveedor() {
      this.proveedor.NombreProveedor = this.formAddProveedor.value.nombreProveedor;
      this.proveedor.NombreRepresentante = this.formAddProveedor.value.nombreRepresentante;
      this.proveedor.Descripcion = this.formAddProveedor.value.descripcionProveedor;
      this.proveedor.Documento = this.formAddProveedor.value.numeroRuc;
      this.proveedor.Direccion = this.formAddProveedor.value.direccionProveedor;
      this.proveedor.Email = this.formAddProveedor.value.email;
      this.proveedor.Mercado = this.formAddProveedor.value.isMercado === true ? 1 : 0;
  }

  initFormAdd() {
      this.formAddProveedor = this._formBuilderProveedor.group({
          'nombreProveedor': new FormControl('', [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(100),
              CustomValidators.nospaceValidator
          ]),
          'numeroRuc': new FormControl('', [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
              CustomValidators.nospaceValidator
          ])
          , 'direccionProveedor': new FormControl('', [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(400),
              CustomValidators.nospaceValidator
          ])
          , 'nombreRepresentante': new FormControl('',
              [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(200),
                  CustomValidators.nospaceValidator
          ])
          , 'email': new FormControl('', [
              Validators.minLength(5),
              Validators.maxLength(200),
              CustomValidators.nospaceValidator
          ])
          , 'descripcionProveedor': new FormControl('',
              [
                  Validators.maxLength(400)
              ])
          , 'isMercado': new FormControl('',
              [])
      });
  }

  initFormTelefonos() {
      this.formAddTelefonos = this._formBuilderProveedor.group({});
  }

  validarTelefonos() {
      let valido = true;
      let indiceNoValido = 0;

      this.contactos.forEach( (value , index) => {
          this.contactos[index].Titular = value.IsTitular === true ? 1 : 0;
          if (!Utils.valorCampoEsValido(value.Telefono) || !Utils.valorCampoEsValido(value.Cargo) || !Utils.valorCampoEsValido(value.Nombre)) {
              valido = false;
              indiceNoValido = index;
          }
      });

      if (!valido) {
          if (indiceNoValido === 0) {
              Utils.showMsgInfo('Debes registrar al menos un contacto telefonico válido!');
              return false;
          } else {
              Utils.showMsgInfo('Debes registrar todas las filas de contactos agregadas al formulario correctamente!');
              return false;
          }
      }

      return true;
  }

  validarAgregarNuevoTelefonoFormulario() {
      let valido = true;

      this.contactos.forEach( (value , index) => {
          this.contactos[index].Titular = value.IsTitular === true ? 1 : 0;
          if (!Utils.valorCampoEsValido(value.Telefono) || !Utils.valorCampoEsValido(value.Cargo) || !Utils.valorCampoEsValido(value.Nombre)) {
              valido = false;
          }
      });

      if (!valido) {
          Utils.showMsgInfo('Debes registrar todas las filas de contactos agregadas al formulario correctamente!');
          return false;
      }

      return true;
  }

  eliminarTelefono (telefono: TelefonoProveedor, indice: any) {
      // Si es el primer registro, elimina todos los contactos a excepcion de el mismo
      if (indice === 0 && this.contactos.length > 1) {
          let telefonoProveedor = this.contactos[0];
          this.contactos = [];
          this.contactos.push(telefonoProveedor);
      } else {
          this.contactos.splice(indice, 1);
      }
  }

  changeMercado(event) {

        const isMercado = event.checked;

        if (isMercado) {
            this.formAddProveedor.controls['numeroRuc'].clearValidators();
            this.formAddProveedor.controls['numeroRuc'].setValue('');
            this.formAddProveedor.controls['numeroRuc'].disable();
            this.formAddProveedor.controls['numeroRuc'].updateValueAndValidity();
        } else {
            this.formAddProveedor.controls['numeroRuc'].setValidators([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20),
                CustomValidators.nospaceValidator
            ]);
            this.formAddProveedor.controls['numeroRuc'].enable();
            this.formAddProveedor.controls['numeroRuc'].updateValueAndValidity();
        }
  }
}
