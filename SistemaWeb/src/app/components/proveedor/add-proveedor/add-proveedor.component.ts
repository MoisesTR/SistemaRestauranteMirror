import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {ProveedorService} from '../../../services/shared/proveedor.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Proveedor} from '../../../models/Proveedor';
import swal from 'sweetalert2';
import {Utils} from '../../Utils';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {filter, pairwise} from 'rxjs/operators';
import {PreviousRouteService} from '../../../services/service.index';


declare var $: any;

@Component({
  selector: 'add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.scss']
})
export class AddProveedorComponent implements OnInit {

  public proveedor: Proveedor;
  public tituloPantalla = 'Proveedor';
  formAddProveedor: FormGroup;
  previousUrl: string;

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _proveedorService: ProveedorService
      , private _formBuilderProveedor: FormBuilder
      , private previousRouteService: PreviousRouteService
  ) {}

  ngOnInit() {
      this.previousUrl = this.previousRouteService.getPreviousUrl();
      console.log(this.previousRouteService.getPreviousUrl());
      this.proveedor = new Proveedor();

      $(document).ready(function() {

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

              )
                  return false;
          });

      });

      $('.telefono').mask('0000-0000');

      this.initFormAdd();
  }

  createProveedor() {

      this.capturarDadosProveedor();
      this._proveedorService.createProveedor(this.proveedor).subscribe(
          response => {
              if (response.IdProveedor) {
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

  }

  capturarDadosProveedor() {
      this.proveedor.NombreProveedor = this.formAddProveedor.value.nombreProveedor;
      this.proveedor.NombreRepresentante = this.formAddProveedor.value.nombreRepresentante;
      this.proveedor.Descripcion = this.formAddProveedor.value.descripcionProveedor;
      this.proveedor.Documento = this.formAddProveedor.value.numeroRuc;
      this.proveedor.Direccion = this.formAddProveedor.value.direccionProveedor;
      this.proveedor.Telefono1 = this.formAddProveedor.value.telefono1.toString().replace('-', '');
      this.proveedor.Telefono2 = this.formAddProveedor.value.telefono2;
      this.proveedor.Telefono2 = this.proveedor.Telefono2 === null ? null : this.proveedor.Telefono2.toString().replace('-', '');
      this.proveedor.Email = this.formAddProveedor.value.email;
      this.proveedor.Retencion2 = this.formAddProveedor.value.retencion === true ? 1 : 0;

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
          , 'direccionProveedor': new FormControl('',[
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
          , 'email': new FormControl('',[
              Validators.minLength(5),
              Validators.maxLength(200),
              CustomValidators.nospaceValidator
          ])
          , 'telefono1': new FormControl('',[
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(8),
              CustomValidators.nospaceValidator
          ])
          , 'telefono2': new FormControl('',[
              Validators.minLength(8),
              Validators.maxLength(8)
          ])
          , 'descripcionProveedor': new FormControl('',
              [
                  Validators.maxLength(400)
              ])
          , 'retencion': new FormControl('',
              [])

      });
  }


}
