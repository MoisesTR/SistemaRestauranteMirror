import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {ClasificacionProductoService, SubClasificacionProductoService} from '@app/services/service.index';
import {ActivatedRoute, Router} from '@angular/router';
import {SubClasificacionProducto} from '@app/models/SubClasificacionProducto';
import {Subject} from 'rxjs';
import {idioma_espanol} from '@app/services/shared/global';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {CustomValidators} from '@app/validadores/CustomValidators';
import {ClasificacionProducto} from '@app/models/ClasificacionProducto';
import {Utils} from '../Utils';
import {ModalDirective} from 'ng-uikit-pro-standard';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sub-clasificacion-producto',
  templateUrl: './sub-clasificacion-producto.component.html',
  styleUrls: ['./sub-clasificacion-producto.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SubClasificacionProductoComponent implements OnInit, InvocarFormulario {

  public subclasificacion: SubClasificacionProducto;
  public subclasificaciones: SubClasificacionProducto[];
  public clasificaciones: ClasificacionProducto;

  @ViewChild('modalAddSubclasificacion') modalAddSubclasificacion: ModalDirective;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  formAddSubClasificacion: FormGroup;
  formUpdateSubClasificacion: FormGroup;

  public tituloPantalla = 'Subclasificación';

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _subClasificacionService: SubClasificacionProductoService
    , private _clasificacionService: ClasificacionProductoService
    , private formBuilderSubClasificacion: FormBuilder

  ) {
    this.subclasificacion = new SubClasificacionProducto();
    this.initCustomValidatorsFormSubClasificacion();
  }

  private initCustomValidatorsFormSubClasificacion() {

    this.formAddSubClasificacion = this.formBuilderSubClasificacion.group({
        'nombreSubClasificacion' : new FormControl('', [
          Validators.required
          , Validators.minLength(2)
          , Validators.maxLength(100)
          , CustomValidators.nospaceValidator
        ])
        , 'descripcionSubClasificacion' : new FormControl('', [
          Validators.required
          , Validators.minLength(3)
          , Validators.maxLength(300)
          , CustomValidators.nospaceValidator
        ])
        , 'clasificacion' : new FormControl('', [
        Validators.required
      ])
    });

    this.formUpdateSubClasificacion = this.formBuilderSubClasificacion.group({
      'nombreSubClasificacion' : new FormControl('', [
        Validators.required
        , Validators.minLength(2)
        , Validators.maxLength(100)
        , CustomValidators.nospaceValidator
      ])
      , 'descripcionSubClasificacion' : new FormControl('', [
        Validators.required
        , Validators.minLength(3)
        , Validators.maxLength(300)
        , CustomValidators.nospaceValidator
      ])
      , 'clasificacion' : new FormControl('', [
        Validators.required
      ])
    });
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
                      this.InvocarModal(this.modalAddSubclasificacion, this.formAddSubClasificacion);
                  }
              }
          ]
      };
  }

  ngOnInit() {

    this.settingsDatatable();
    this.getSubClasificaciones();
    this.getClasificaciones();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }


  getSubClasificaciones() {
    this._subClasificacionService.getSubClasificaciones().subscribe(
      response => {

        if (response.subclasificaciones) {
          this.subclasificaciones = response.subclasificaciones;
          this.dtTrigger.next();
        } else {

        }
      }, error => {

      }, () => {

      }
    );
  }

  getSubClasificacionesRender() {
      this._subClasificacionService.getSubClasificaciones().subscribe(
          response => {

              if (response.subclasificaciones) {
                  this.subclasificaciones = response.subclasificaciones;
                  this.rerender();
              } else {

              }
          }, error => {

          }, () => {

          }
      );
  }

  capturarDatosIngresados() {
    this.subclasificacion.NombreSubClasificacion = this.formAddSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formAddSubClasificacion.value.descripcionSubClasificacion;
  }

  createSubCasificacion(Modal) {

    this.capturarDatosIngresados();

    this._subClasificacionService.createSubClasificacionProducto(this.subclasificacion).subscribe(
      response => {
        if (response.IdSubClasificacion) {
          swal(
            'Subclasificación',
            'la Subclasificación ha sido creado exitosamente!',
            'success'
          ).then( () =>  {
            Modal.hide();
            this.formAddSubClasificacion.reset();
            this.subclasificacion = new SubClasificacionProducto();
          });
        } else {
            Utils.showMsgError('Ha ocurrido un error al insertar la subclasificación, intenta nuevamente!', this.tituloPantalla);
        }
        this.getSubClasificacionesRender();
      }, error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }

  capturarDatosActualizados() {
    this.subclasificacion.NombreSubClasificacion = this.formUpdateSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formUpdateSubClasificacion.value.descripcionSubClasificacion;
  }

  updateSubClasificacion(Modal) {

    this.capturarDatosActualizados();
    this._subClasificacionService.updateSubClasificacionProducto(this.subclasificacion).subscribe(
      response => {
        if (response.success) {
          swal(
            'Subclasificación',
            'La Subclasificación ha sido actualizado exitosamente!',
            'success'
          ).catch(swal.noop).then( () => {
            Modal.hide();
            this.formUpdateSubClasificacion.reset();
            this.getSubClasificacionesRender();
            this.subclasificacion = new SubClasificacionProducto();
          });

        } else {
          Utils.showMsgError('Ha ocurrido un error en la actualización, intentalo nuevamente', this.tituloPantalla);
        }
      }, error => {
       Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }

  deleteSubClasificacion(IdSubClasificacion) {
    swal({
      title: 'Estas seguro(a)?',
      text: 'La Subclasificación sera eliminada permanentemente!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            this._subClasificacionService.deleteSubclasificacion(IdSubClasificacion).subscribe(
                response => {
                    if (response.success) {
                        swal(
                            this.tituloPantalla,
                            'La Subclasificación ha sido eliminada exitosamente',
                            'success'
                        ).then(() => {
                            this.getSubClasificacionesRender();
                        });
                    } else {
                        Utils.showMsgInfo('Ha ocurrido un error al eliminar, intentalo nuevamente', this.tituloPantalla);
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
                }
            );
        } else if (result.dismiss === swal.DismissReason.cancel) {}
    });
  }

  getClasificaciones() {

    this._clasificacionService.getClasificaciones().subscribe(
      response => {
        if (response.clasificaciones) {
          this.clasificaciones = response.clasificaciones;
        } else {
          Utils.showMsgInfo('Ha ocurrido un error obteniendo las clasificaciones', this.tituloPantalla);
        }

      }, error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }



  InvocarModal(Modal, Formulario) {
    Utils.invocacionModal(Modal, Formulario);
  }

  invocarModalUpdateSubClasificacion(Modal, Subclasificacion: SubClasificacionProducto) {

    this.subclasificacion.IdSubClasificacion = Subclasificacion.IdSubClasificacion;
    this.subclasificacion.NombreSubClasificacion = Subclasificacion.NombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = Subclasificacion.DescripcionSubClasificacion;
    this.subclasificacion.IdClasificacion = Subclasificacion.IdClasificacion;

    this.formUpdateSubClasificacion.reset();
    this.formUpdateSubClasificacion.setValue({
        nombreSubClasificacion: Subclasificacion.NombreSubClasificacion
        , descripcionSubClasificacion: Subclasificacion.DescripcionSubClasificacion
        , clasificacion : Subclasificacion.IdClasificacion
    });

    Modal.show();

  }

  onChangeClasificacion(event) {
      if (event === null) {
          this.subclasificacion.IdClasificacion  = null;
      } else {
          this.subclasificacion.IdClasificacion = event.IdClasificacion;
      }
  }
}
