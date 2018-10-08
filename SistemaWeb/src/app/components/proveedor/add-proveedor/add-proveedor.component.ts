import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProveedorService} from '../../../services/shared/proveedor.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Proveedor} from '../../../models/Proveedor';
import swal from 'sweetalert2';
import {Utils} from '../../Utils';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {PreviousRouteService} from '../../../services/service.index';
import {TelefonoProveedor} from '../../../models/TelefonoProveedor';
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
  public telefonos: TelefonoProveedor[];
  telefonRequerido: TelefonoProveedor;
  public formAddTelefonos: FormGroup;
  public telefonoIngresado = false;

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
      console.log(this.previousRouteService.getPreviousUrl());
      this.proveedor = new Proveedor();
      this.telefonRequerido = new TelefonoProveedor();
      this.telefonos = [];
      this.telefonos.push(this.telefonRequerido);

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
      });

      $('.telefono').mask('0000-0000');

      this.initFormAdd();
      this.initFormTelefonos();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  agregarTelefono() {
      if (this.telefonosValidos()) {
          const telefonoProveedor: TelefonoProveedor = new TelefonoProveedor();
          this.telefonos.push(telefonoProveedor);
      } else {
          Utils.showMsgInfo('Completa correctamente el formulario de telefonos');
      }
  }

  createProveedor() {

      if (this.telefonoIngresado) {
          this.capturarDadosProveedor();
          this._proveedorService.createProveedor(this.proveedor).subscribe(
              response => {
                  if (response.IdProveedor) {
                      this.telefonos.forEach( (value, index) => {
                          value.IdProveedor = response.IdProveedor;
                           this.createTelefonoProveedor(value);
                      });
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
                  } else {
                      Utils.showMsgInfo('Ha ocurrido un error al insertar el proveedor, intentalo nuevamente', this.tituloPantalla);
                  }
              }, error => {
                  Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
              }
          );
      } else {
        Utils.showMsgInfo('Debes registrar al menos un telefono al proveedor');
      }
  }

  createTelefonoProveedor(telefono: TelefonoProveedor) {
      this._proveedorService.createTelefonoProveedor(telefono).subscribe(
          response => {
              console.log(response);
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

  capturarDadosProveedor() {
      this.proveedor.NombreProveedor = this.formAddProveedor.value.nombreProveedor;
      this.proveedor.NombreRepresentante = this.formAddProveedor.value.nombreRepresentante;
      this.proveedor.Descripcion = this.formAddProveedor.value.descripcionProveedor;
      this.proveedor.Documento = this.formAddProveedor.value.numeroRuc;
      this.proveedor.Direccion = this.formAddProveedor.value.direccionProveedor;
      this.proveedor.Telefono1 = '87792956';
      this.proveedor.Email = this.formAddProveedor.value.email;
      this.proveedor.Retencion2 = this.formAddProveedor.value.retencion === true ? 1 : 0;
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
          , 'retencion': new FormControl('',
              [])
          , 'isMercado': new FormControl('',
              [])
      });
  }

  initFormTelefonos() {
      this.formAddTelefonos = this._formBuilderProveedor.group({});
  }

  showModalTelefonos () {
      this.modalTelefonos.show();
  }

  agregarTelefonosProveedor() {
      if (this.telefonosValidos()) {
          this.modalTelefonos.hide();
          console.log(this.telefonos);
      } else {
          Utils.showMsgInfo('Completa correctamente el formulario de telefonos');
      }
  }

  telefonosValidos() {
      let valido = true;
      this.telefonos.forEach( (value , index) => {
          this.telefonos[index].Titular = value.IsTitular === true ? 1 : 0;
          if (value.Telefono === '' || value.Cargo === '' || value.Nombre === '') {
              valido = false;
          }
      });
      this.telefonoIngresado = valido;
      return valido;
  }

  eliminarTelefono (telefono: TelefonoProveedor, index: any) {
      this.telefonos.splice(index, 1);
  }

  changeMercado(event) {
        const isMercado = event.path[0].checked === true ? 1 : 0;

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
