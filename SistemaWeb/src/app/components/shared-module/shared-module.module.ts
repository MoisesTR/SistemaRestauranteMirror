import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowErrorsComponent} from "../show-errors.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';
import {MDBBootstrapModulePro} from '../../typescripts/pro';
import {MDBBootstrapModule} from '../../typescripts/free';
import {ToastModule} from '../../typescripts/pro/alerts/toast/toast.module';
import {HttpModule} from '@angular/http';
import {DataTablesModule} from 'angular-datatables';

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
  ],
  exports: [
      CommonModule
      , ShowErrorsComponent
      , NgSelectModule
      , MDBBootstrapModule
      , MDBBootstrapModulePro
      , ToastModule
      , ReactiveFormsModule
      , HttpModule
      , HttpClientModule
      , FormsModule
      , DataTablesModule
  ],
    declarations: [ShowErrorsComponent]
  , providers  : [{
    provide: NG_SELECT_DEFAULT_CONFIG,
    useValue: {
      notFoundText: 'No se encontraron resultados'
    }
  }]
})
export class SharedModuleModule { }
