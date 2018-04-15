import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowErrorsComponent} from '../show-errors.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';
import {MDBBootstrapModulePro} from '../../typescripts/pro';
import {MDBBootstrapModule} from '../../typescripts/free';
import {ToastModule} from '../../typescripts/pro/alerts/toast/toast.module';
import {HttpModule} from '@angular/http';
import {DataTablesModule} from 'angular-datatables';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MyHttpInterceptor} from '../../services/MyHttpInterceptor';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {ClickOutsideModule} from 'ng4-click-outside';
import {ModalClasificacionComponent} from '../modales/modal-clasificacion/modal-clasificacion.component';
import {ModalEnvaseComponent} from '../modales/modal-envase/modal-envase.component';
import {ModalUnidadMedidaComponent} from '../modales/modal-unidad-medida/modal-unidad-medida.component';
import {ModalCategoriaComponent} from '../modales/modal-categoria/modal-categoria.component';
import {ModalSucursalComponent} from '../modales/modal-sucursal/modal-sucursal.component';
import {ModalProveedorComponent} from '../modales/modal-proveedor/modal-proveedor.component';
import {ModalSubclasificacionComponent} from '../modales/modal-subclasificacion/modal-subclasificacion.component';


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
      , ClickOutsideModule
  ],
  exports: [
      CommonModule
      , ShowErrorsComponent
      , BreadcrumbComponent
      , ModalEnvaseComponent
      , ModalUnidadMedidaComponent
      , ModalProveedorComponent
      , ModalClasificacionComponent
      , ModalSubclasificacionComponent
      , ModalSucursalComponent
      , ModalCategoriaComponent
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
      , ClickOutsideModule
  ],
    declarations: [ShowErrorsComponent
        , BreadcrumbComponent
        , ModalEnvaseComponent
        , ModalUnidadMedidaComponent
        , ModalProveedorComponent
        , ModalClasificacionComponent
        , ModalSubclasificacionComponent
        , ModalSucursalComponent
        , ModalCategoriaComponent
    ]
  , providers  : [{
    provide: NG_SELECT_DEFAULT_CONFIG,
    useValue: {
      notFoundText: 'No se encontraron resultados'
        }
    } ,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: MyHttpInterceptor,
        multi: true
    }
    ]
})
export class SharedModuleModule { }
