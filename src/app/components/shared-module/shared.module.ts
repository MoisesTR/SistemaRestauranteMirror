import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowErrorsComponent} from '../show-errors.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';
import {DataTablesModule} from 'angular-datatables';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {ModalEnvaseComponent} from '../modales/modal-envase/modal-envase.component';
import {ModalUnidadMedidaComponent} from '../modales/modal-unidad-medida/modal-unidad-medida.component';
import {ModalCategoriaComponent} from '../modales/modal-categoria/modal-categoria.component';
import {ModalSucursalComponent} from '../modales/modal-sucursal/modal-sucursal.component';
import {ModalProveedorComponent} from '../modales/modal-proveedor/modal-proveedor.component';
import {ModalSubclasificacionComponent} from '../modales/modal-subclasificacion/modal-subclasificacion.component';
import {ModalEmpaqueComponent} from '../modales/modal-empaque/modal-empaque.component';
import {BuscarPipe} from '../../pipe/buscar.pipe';
import {FormatoComaDineroPipe} from '../../pipe/formato-coma-dinero.pipe';
import {BuscarTrabajadorPipe} from '../../pipe/buscar-trabajador.pipe';
import {BuscarProveedorPipe} from '../../pipe/buscar-proveedor.pipe';
import {ModalClasificacionComponent} from '../modales/modal-clasificacion/modal-clasificacion.component';
import {MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import {NumberOnlyDirective} from '../../directives/onlynumber.directive';
import {DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {NativeDateTimeAdapter} from 'ng-pick-datetime/date-time/adapter/native-date-time-adapter.class';
import {Platform} from '@angular/cdk/platform';
import {BuscarProductoNombrePipe} from '../../pipe/buscar-nombre-producto.pipe';
import {NumberDirective} from '../../directives/onlypositivenumber.directive';
import {AlphanumericDirective} from '../../directives/alphanumeric.directive';

@NgModule({
  imports: [
      CommonModule
      , FormsModule
      , ReactiveFormsModule
      , HttpClientModule
      , MDBBootstrapModulesPro
      , NgSelectModule
      , NgxSpinnerModule
      , OwlDateTimeModule
      , OwlNativeDateTimeModule
  ],
  exports: [
      CommonModule
      , FormsModule
      , ReactiveFormsModule
      , HttpClientModule
      , MDBBootstrapModulesPro
      , NgSelectModule
      , DataTablesModule
      , NgxSpinnerModule
      , OwlDateTimeModule
      , OwlNativeDateTimeModule
      , ShowErrorsComponent
      , BreadcrumbComponent
      , ModalEnvaseComponent
      , ModalUnidadMedidaComponent
      , ModalProveedorComponent
      , ModalSubclasificacionComponent
      , ModalSucursalComponent
      , ModalCategoriaComponent
      , ModalEmpaqueComponent
      , ModalClasificacionComponent
      , BuscarPipe
      , BuscarTrabajadorPipe
      , BuscarProveedorPipe
      , BuscarProductoNombrePipe
      , FormatoComaDineroPipe
      , NumberOnlyDirective
      , NumberDirective
      , AlphanumericDirective
  ],

 declarations: [
    ShowErrorsComponent
    , BreadcrumbComponent
    , ModalEnvaseComponent
    , ModalUnidadMedidaComponent
    , ModalProveedorComponent
    , ModalSubclasificacionComponent
    , ModalSucursalComponent
    , ModalCategoriaComponent
    , ModalSubclasificacionComponent
    , ModalClasificacionComponent
    , ModalEmpaqueComponent
    , BuscarPipe
    , BuscarTrabajadorPipe
    , BuscarProveedorPipe
    , BuscarProductoNombrePipe
    , FormatoComaDineroPipe
    , NumberOnlyDirective
    , NumberDirective
    , AlphanumericDirective
 ]
  , providers  : [{
    provide: NG_SELECT_DEFAULT_CONFIG,
    useValue: {
      notFoundText: 'No se encontraron resultados'
        }
    },  {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},
        {provide: DateTimeAdapter, useClass: NativeDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE, Platform]}
    ]
})
export class SharedModule { }
