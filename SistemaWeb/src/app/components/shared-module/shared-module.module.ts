import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowErrorsComponent} from "../show-errors.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';
import {MDBBootstrapModulePro} from '../../typescripts/pro';
import {MDBBootstrapModule} from '../../typescripts/free';
import {ToastModule} from '../../typescripts/pro/alerts/toast/toast.module';
import {HttpModule} from '@angular/http';
import {DataTablesModule} from 'angular-datatables';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MyHttpInterceptor} from '../../services/MyHttpInterceptor';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';


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
    declarations: [ShowErrorsComponent , BreadcrumbComponent]
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
