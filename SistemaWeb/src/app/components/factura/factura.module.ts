import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {DataTablesModule} from 'angular-datatables';
import {AddfacturaComponent} from './addfactura/addfactura.component';
import {DeleteFacturaComponent} from './delete-factura/delete-factura.component';
import {ListFacturaComponent} from './list-factura/list-factura.component';
import {FacturaRoutingModule} from './factura.routing.module';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {FacturaService} from '../../services/factura.service';


@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    , DataTablesModule
    , ReactiveFormsModule
    , FacturaRoutingModule
    , SharedModuleModule
  ],
  declarations: [

  AddfacturaComponent,
  DeleteFacturaComponent,
  ListFacturaComponent
  ]
  ,providers: [FacturaService]
  ,exports: []
})
export class FacturaModule {

}
