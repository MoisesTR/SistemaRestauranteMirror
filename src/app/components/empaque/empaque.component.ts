import {Component, OnInit, ViewChild} from '@angular/core';
import {EmpaqueService} from '../../services/shared/empaque.service';
import {Empaque} from '../../models/Empaque';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import {idioma_espanol} from '../../services/shared/global';
import {CustomValidators} from '../../validadores/CustomValidators';
import {Utils} from '../Utils';
import {ModalDirective} from 'ng-uikit-pro-standard';

declare var $: any;

@Component({
  selector: 'app-empaque',
  templateUrl: './empaque.component.html',
  styleUrls: ['./empaque.component.css'],
  providers: [EmpaqueService]
})
export class EmpaqueComponent implements OnInit, InvocarFormulario {

  public empaque: Empaque;
  public empaques: Empaque[];
  public tituloPantalla = 'Empaque';

  public formAddEmpaque: FormGroup;
  public formUpdateEmpaque: FormGroup;

  @ViewChild('modalAddEmpaque') modalAddEmpaque: ModalDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _EmpaqueServicio: EmpaqueService
    , private formBuilderEmpaque: FormBuilder
  ) {
    this.empaque = new Empaque();
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
    });

    this.settingsDatatable();
    this.getEmpaques();
    this.initFormAddEmpaque();
    this.initFormUpdateEmpaque();

  }

  settingsDatatable() {

      /*PROPIEDADES GENERALES DE LA DATATABLE*/
      this.dtOptions = <DataTables.Settings>{
          pagingType: 'full_numbers'
          , pageLength: 10
          , language: idioma_espanol
          , 'lengthChange': false
          , responsive : true
          , dom: 'Bfrtip',
          buttons: [
              {
                  text: 'Agregar',
                  key: '1',
                  className: 'btn orange-chang float-right-dt',
                  action:  (e, dt, node, config) => {
                      this.InvocarModal(this.modalAddEmpaque, this.formAddEmpaque);
                  }
              }
          ]
      };
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getEmpaques() {

      this._EmpaqueServicio.getEmpaques().subscribe(
        response => {
          if (response.empaques) {
            this.empaques = response.empaques;
            this.dtTrigger.next();
          }
        }, error => {

        }
      );
  }

  getEmpaquesRender() {
    this._EmpaqueServicio.getEmpaques().subscribe(
      response => {
        if (response.empaques) {
          this.empaques = response.empaques;
          this.rerender();
        }
      }, error => {

      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddEmpaque() {

    this.formAddEmpaque = this.formBuilderEmpaque.group({
      'nombreEmpaque': new FormControl('', [

          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ])

      , 'descripcionEmpaque': new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
      ])
    });

  }

  initFormUpdateEmpaque() {

    this.formUpdateEmpaque = this.formBuilderEmpaque.group({
      'nombreEmpaque': new FormControl('', [

        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        CustomValidators.nospaceValidator
      ])
      , 'descripcionEmpaque': new FormControl('',
        [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
            CustomValidators.nospaceValidator
        ])
    });
  }


  createEmpaque(Modal) {
    this.getValuesFormAddEmpaque();

    this._EmpaqueServicio.createEmpaque(this.empaque).subscribe(
      response => {

        if (response.IdEmpaque) {
          swal(
            'Empaque',
            'El Empaque ha sido creado exitosamente!',
            'success'
          ).then(() => {
            Modal.hide();
            this.formAddEmpaque.reset();
            this.empaque = new Empaque();
            this.getEmpaquesRender();
          });

        } else {
          Utils.showMsgInfo('Ha ocurrido un error el insertar el empaque, intenta nuevamnete!!', this.tituloPantalla);
        }
        this.getEmpaquesProductos();
      }, error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }

  getValuesFormAddEmpaque() {
    this.empaque.NombreEmpaque = this.formAddEmpaque.value.nombreEmpaque;
    this.empaque.Descripcion = this.formAddEmpaque.value.descripcionEmpaque;
  }

  getValuesFormUpdateEmpaque() {
    this.empaque.NombreEmpaque = this.formUpdateEmpaque.value.nombreEmpaque;
    this.empaque.Descripcion = this.formUpdateEmpaque.value.descripcionEmpaque;
  }
  getEmpaquesProductos() {
    this._EmpaqueServicio.getEmpaques().subscribe(
      response => {

        if (!response.empaques) {
          Utils.showMsgInfo('Ha ocurrido un error al obtener los empaques', this.tituloPantalla);
        } else {
          this.empaques = response.empaques;
        }
      }, error => {
          Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
    }
    );
  }

  updateEmpaque(Modal) {

    this.getValuesFormUpdateEmpaque();
    this._EmpaqueServicio.updateEmpaque(this.empaque).subscribe(
      response => {
        if (response.success) {
          swal(
            'Empaque',
            'El empaque ha sido actualizado exitosamente!',
            'success'
          ).catch(swal.noop).then(() => {
            Modal.hide();
            this.formUpdateEmpaque.reset();
            this.getEmpaquesRender();
            this.empaque = new Empaque();
          });
        } else {
          Utils.showMsgInfo('Ha ocurrido un error en la actualización', this.tituloPantalla);
        }
      }, error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }

  deleteEmpaque(IdEmpaque) {

    swal({
      title: 'Estas seguro(a)?',
      text: 'El empaque sera eliminado permanentemente!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
     if (result.value) {
         this._EmpaqueServicio.deleteEmpaque(IdEmpaque).subscribe(
             response => {
                 if (response.success) {
                     swal(
                         'Eliminado!',
                         'El empaque ha sido eliminado exitosamente',
                         'success'
                     ).then(() => {
                         this.getEmpaquesRender();
                     });
                 } else {
                     Utils.showMsgInfo('Ha ocurrido un error al eliminar', this.tituloPantalla);
                 }
             }, error => {
                 Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
             }
         );
     } else if (result.dismiss === swal.DismissReason.cancel) {}
    });
  }

  InvocarModal(Modal, Formulario) {
    Utils.invocacionModal(Modal, Formulario);
  }

  invocarModalUpdate(Modal, empaque: Empaque) {

      this.empaque.IdEmpaque  = empaque.IdEmpaque;
      this.empaque.NombreEmpaque = empaque.NombreEmpaque;
      this.empaque.Descripcion = empaque.Descripcion;

      this.formUpdateEmpaque.reset();
      this.formUpdateEmpaque.setValue({
          nombreEmpaque: empaque.NombreEmpaque
          , descripcionEmpaque: empaque.Descripcion
      });

      Modal.show();

  }
}