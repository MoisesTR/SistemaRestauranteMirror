import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowErrorsComponent} from '../show-errors.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';
import {MDBBootstrapModulePro} from '../../typescripts/pro';
import {MDBBootstrapModule} from '../../typescripts/free';
import {ToastModule} from '../../typescripts/pro/alerts/toast/toast.module';
import {HttpModule} from '@angular/http';
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


@NgModule({
  imports: [
    CommonModule
    ,  NgSelectModule
      , MDBBootstrapModule
      , MDBBootstrapModulePro
      , ToastModule
      , ReactiveFormsModule
      , HttpModule
      , HttpClientModule
      , FormsModule
      , DataTablesModule
      , NgxSpinnerModule
  ],
  exports: [
      CommonModule
      , ShowErrorsComponent
      , BreadcrumbComponent
      , ModalEnvaseComponent
      , ModalUnidadMedidaComponent
      , ModalProveedorComponent
      , ModalSubclasificacionComponent
      , ModalSucursalComponent
      , ModalCategoriaComponent
      , ModalEmpaqueComponent
      , BuscarPipe
      , FormatoComaDineroPipe
      , NgSelectModule
      , MDBBootstrapModule
      , MDBBootstrapModulePro
      , ToastModule
      , ReactiveFormsModule
      , HttpModule
      , HttpClientModule
      , FormsModule
      , DataTablesModule
      , NgxSpinnerModule
  ],
    declarations: [ShowErrorsComponent
        , BreadcrumbComponent
        , ModalEnvaseComponent
        , ModalUnidadMedidaComponent
        , ModalProveedorComponent
        , ModalSubclasificacionComponent
        , ModalSucursalComponent
        , ModalCategoriaComponent
        , ModalEmpaqueComponent
        , BuscarPipe
        , FormatoComaDineroPipe
    ]
  , providers  : [{
    provide: NG_SELECT_DEFAULT_CONFIG,
    useValue: {
      notFoundText: 'No se encontraron resultados'
        }
    }
    ]
})
export class SharedModuleModule { }
