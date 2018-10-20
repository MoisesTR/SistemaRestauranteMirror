import {Component, OnInit, ViewChild} from '@angular/core';
import {Proveedor} from '../../../models/Proveedor';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProveedorService} from '../../../services/shared/proveedor.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Utils} from '../../Utils';

@Component({
  selector: 'update-proveedor',
  templateUrl: './update-proveedor.component.html',
  styleUrls: ['./update-proveedor.component.scss']
})
export class UpdateProveedorComponent  implements  OnInit {
  @ViewChild('modalTelefonos') modalTelefonos: ModalDirective;
  public proveedor: Proveedor;
  public tituloPantalla = 'Proveedor';
  public formUpdateProveedor: FormGroup;

  constructor(
        private _route: ActivatedRoute
        , private _router: Router
        , private _proveedorService: ProveedorService
        , private _formBuilderProveedor: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.proveedor = new Proveedor();
        this.initFormUpdate();
        this.getProveedor();
    }

    initFormUpdate() {
      this.formUpdateProveedor = this._formBuilderProveedor.group({
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

    getProveedor() {
      this._route.params.forEach((params: Params)  => {
          const id = params['id'];
          this.proveedor.IdProveedor = id;

          this._proveedorService.getProveedor(id).subscribe(
              response => {
                  if (response.proveedor) {
                      this.proveedor = response.proveedor;
                      this.inicializarFormuularioProveedor();
                  }
              }, error => {
                  Utils.showMsgError(Utils.msgError(error));
              }, () => {

              }
          );
        });
    }
    inicializarFormuularioProveedor() {
        this.formUpdateProveedor.controls['nombreProveedor'].setValue(this.proveedor.NombreProveedor);
        this.formUpdateProveedor.controls['numeroRuc'].setValue(this.proveedor.Documento);
        this.formUpdateProveedor.controls['direccionProveedor'].setValue(this.proveedor.Direccion);
        this.formUpdateProveedor.controls['nombreRepresentante'].setValue(this.proveedor.NombreRepresentante);
        this.formUpdateProveedor.controls['email'].setValue(this.proveedor.Email);
        this.formUpdateProveedor.controls['telefono1'].setValue(this.proveedor.Telefono1);
        this.formUpdateProveedor.controls['telefono2'].setValue(this.proveedor.Telefono2);
        this.formUpdateProveedor.controls['descripcionProveedor'].setValue(this.proveedor.Descripcion);
        this.formUpdateProveedor.controls['retencion'].setValue(this.proveedor.Retencion2);
    }

    updateProveedor() {
      this.getValuesFormUpdate();

      this._proveedorService.updateProveedor(this.proveedor).subscribe(
          response => {
              if (response.success) {
                  Utils.showMsgSucces('El proveedor se ha actualizado correctamente', this.tituloPantalla);
                  this._router.navigate(['proveedor/']);
              } else {
                  Utils.showMsgError('Ha ocurrido un error al actualizar el proveedor', this.tituloPantalla);
              }
          } , error => {
                Utils.showMsgError(Utils.msgError(error));
          }, () => {

          }
      );
    }

    showModalTelefonos () {
        this.modalTelefonos.show();
    }

    getValuesFormUpdate() {
      this.proveedor.NombreProveedor = this.formUpdateProveedor.value.nombreProveedor;
      this.proveedor.Documento = this.formUpdateProveedor.value.numeroRuc;
      this.proveedor.Direccion = this.formUpdateProveedor.value.direccionProveedor;
      this.proveedor.NombreRepresentante = this.formUpdateProveedor.value.nombreRepresentante;
      this.proveedor.Email = this.formUpdateProveedor.value.email;
      this.proveedor.Telefono1 = this.formUpdateProveedor.value.telefono1;
      this.proveedor.Telefono2 = this.formUpdateProveedor.value.telefono2;
      this.proveedor.Descripcion = this.formUpdateProveedor.value.descripcionProveedor;
      this.proveedor.Retencion2 = this.formUpdateProveedor.value.retencion === true ? 1 : 0;
    }
}
