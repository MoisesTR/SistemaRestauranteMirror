import {Component, OnInit, ViewChild} from '@angular/core';
import {UnidadMedida} from '../../models/UnidadMedida';
import {UnidadMedidaService} from '../../services/shared/unidad-medida.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {idioma_espanol} from '../../services/shared/global';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import {CustomValidators} from '../../validadores/CustomValidators';
import {ClasificacionProducto} from '../../models/ClasificacionProducto';
import {ClasificacionProductoService} from '../../services/shared/clasificacion-producto.service';
import {ClasificacionUnidadMedidaService} from '../../services/shared/clasificacion-unidad-medida.service';
import {ClasificacionUnidadDeMedida} from '../../models/ClasificacionUnidadDeMedida';
import {Utils} from '../Utils';
import {ModalDirective} from 'ng-uikit-pro-standard';

declare var $: any;

@Component({
  selector: 'app-unidadmedida',
  templateUrl: './unidadmedida.component.html',
  styleUrls: ['./unidadmedida.component.css'],
  providers: [UnidadMedidaService]
})

export class UnidadmedidaComponent implements OnInit, InvocarFormulario {

  public unidadMedida: UnidadMedida;
  public unidadesMedida: UnidadMedida[];
  public clasificaciones: ClasificacionProducto[];
  public formUpdateUnidadMedida: FormGroup;
  public clasificacionesUnidad: ClasificacionUnidadDeMedida[];
  public tituloPantalla = 'Unidad de Medida';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  formAddUnidadMedida: FormGroup;

  @ViewChild('modalAddUnidadMedida') modalAddUnidadMedida: ModalDirective;
  @ViewChild('modalUpdateUnidadMedida') modalUpdateUnidadMedida: ModalDirective;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _UnidadMedidaServicio: UnidadMedidaService
    , private _clasificacionService: ClasificacionProductoService
    , private _clasificacionUnidad: ClasificacionUnidadMedidaService
    , private fBuilderUnidadMedida: FormBuilder
    ) {

    this.unidadMedida = new UnidadMedida();

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

    this._UnidadMedidaServicio.getUnidadesMedida().subscribe(
      response => {
        if (response.unidadesmedida) {
          this.unidadesMedida = response.unidadesmedida;
          this.dtTrigger.next();
        }
      }, error => {

      }
    );

    this.initFormAdd();
    this.initFormUpdate();
    this.getClasificaciones();
    this.getClasificacionUnidades();

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
                      this.InvocarModal(this.modalAddUnidadMedida, this.formAddUnidadMedida);
                  }
              }
          ]
      };
  }

  initFormAdd() {
    this.formAddUnidadMedida = this.fBuilderUnidadMedida.group({

      'nombreUnidadMedida': new FormControl('', [
        Validators.required
        , Validators.minLength(2)
        , Validators.maxLength(100)
        , CustomValidators.nospaceValidator
      ]) ,
      'simboloUnidadMedida': new FormControl('', [
        Validators.required
        , Validators.minLength(2)
        , Validators.maxLength(6)
        , CustomValidators.nospaceValidator
      ]),
      'clasificacionesUnidad': new FormControl('', [
        Validators.required
      ]),
      'nimportancia' : new FormControl('', [
        Validators.required
      ])
    });
  }

  initFormUpdate() {
    this.formUpdateUnidadMedida = this.fBuilderUnidadMedida.group({

      'nombreUnidadMedida': new FormControl('', [
        Validators.required
        , Validators.minLength(2)
        , Validators.maxLength(100)
        , CustomValidators.nospaceValidator
      ]) ,
      'simboloUnidadMedida': new FormControl('', [
        Validators.required
        , Validators.minLength(2)
        , Validators.maxLength(3)
        , CustomValidators.nospaceValidator
      ]) ,
      'clasificacionesUnidad': new FormControl('', [
          Validators.required
      ]),
      'nimportancia' : new FormControl('', [
        Validators.required
      ])
    });
  }

  getClasificacionUnidades() {
    this._clasificacionUnidad.getClasificacionUnidadesMedida().subscribe(
      response => {
        if (response.clasificaciones) {
          this.clasificacionesUnidad = response.clasificaciones;
        }
      }, error => {

      }
    );
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });

    }

  createUnidadMedida(Modal) {

    this.unidadMedida.NombreUnidad = this.formAddUnidadMedida.value.nombreUnidadMedida;
    this.unidadMedida.Simbolo = this.formAddUnidadMedida.value.simboloUnidadMedida;
    this.unidadMedida.NImportancia = this.formAddUnidadMedida.value.nimportancia;

    this._UnidadMedidaServicio.createUnidadMedida(this.unidadMedida).subscribe(
      response => {

        if (response.IdUnidadMedida) {
          swal(
            'Unidad medida',
            'La unidad ha sido creada exitosamente!',
            'success'
          ).then(() => {
            Modal.hide();
            this.formAddUnidadMedida.reset();
            this.unidadMedida = new UnidadMedida();
            this.getUnidadesMedidaRender();
          });
        } else {
          Utils.showMsgInfo('Ha ocurrido un error al insertar la unidad, intentalo nuevamente', this.tituloPantalla);
        }
      },
      error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );

  }

  updateUnidadMedida() {
      this.unidadMedida.NombreUnidad = this.formUpdateUnidadMedida.value.nombreUnidadMedida;
      this.unidadMedida.Simbolo = this.formUpdateUnidadMedida.value.simboloUnidadMedida;
      this.unidadMedida.NImportancia = this.formUpdateUnidadMedida.value.nimportancia;

      this._UnidadMedidaServicio.updateUnidadMedida(this.unidadMedida).subscribe(
          response => {
              if (response.success) {
                  swal(
                      this.tituloPantalla,
                      'La unidad ha sido actualizada exitosamente!',
                      'success'
                  ).then(() => {
                      this.modalUpdateUnidadMedida.hide();
                      this.formUpdateUnidadMedida.reset();
                      this.getUnidadesMedidaRender();
                  });
              }
          }, error => {
              Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
          }
      );
  }

  getUnidadesMedidaRender() {

    this._UnidadMedidaServicio.getUnidadesMedida().subscribe(
      response => {
        if (response.unidadesmedida) {
          this.unidadesMedida = response.unidadesmedida;
          this.rerender();

        } else {

        }
      }, error => {
      }
    );
  }

  getClasificaciones() {
    this._clasificacionService.getClasificaciones().subscribe(
      response => {
        if (response.clasificaciones) {
          this.clasificaciones = response.clasificaciones;
        } else {

        }
      }
    );
  }

  deleteUnidadMedida(IdUnidad) {

    swal({
      title: 'Estas seguro(a)?',
      text: 'La unidad de medida sera eliminada permanentemente!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            this._UnidadMedidaServicio.deleteUnidadMedida(IdUnidad).subscribe(
                response => {
                    if (response.success) {
                        swal(
                            'Eliminada!',
                            'La unidad de medida ha sido eliminada exitosamente',
                            'success'
                        ).then(() => {
                            this.getUnidadesMedidaRender();
                        });
                    } else {
                        Utils.showMsgInfo('Ha ocurrido un error al eliminar', this.tituloPantalla);
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
                }
            );
        } else if (result.dismiss === swal.DismissReason.cancel) {

        }
    });
  }


  InvocarModal(Modal, Formulario) {
    Utils.invocacionModal(Modal, Formulario);
  }

  invocarModalUpdate(Modal, Unidad: UnidadMedida) {

      this.unidadMedida.IdUnidadMedida = Unidad.IdUnidadMedida;
      this.unidadMedida.IdClasificacionUnidadMedida = Unidad.IdClasificacionUnidadMedida;
      this.unidadMedida.NImportancia = Unidad.NImportancia;

      this.formUpdateUnidadMedida.reset();
      this.formUpdateUnidadMedida.setValue({
          nombreUnidadMedida: Unidad.NombreUnidad
          , simboloUnidadMedida: Unidad.Simbolo
          , clasificacionesUnidad : Unidad.IdClasificacionUnidadMedida
          , nimportancia : Unidad.NImportancia
      });

    Modal.show();
  }

  changeClasificacionUnidad(event) {

      if (event === null) {
          this.unidadMedida.IdClasificacionUnidadMedida  = null;
      } else {
          this.unidadMedida.IdClasificacionUnidadMedida = event.IdClasificacionUnidadMedida;
      }
  }

}
