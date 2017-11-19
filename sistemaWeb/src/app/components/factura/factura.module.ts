import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DataTablesModule} from "angular-datatables";
import {ShowErrorsComponent} from "../show-errors.component";
import { AddfacturaComponent } from './addfactura/addfactura.component';
import { DeleteFacturaComponent } from './delete-factura/delete-factura.component';
import { ListFacturaComponent } from './list-factura/list-factura.component';
import {FacturaRoutingModule} from "./factura.routing.module";


@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    , DataTablesModule
    , ReactiveFormsModule
    , FacturaRoutingModule
  ],
  declarations: [

  AddfacturaComponent,
  DeleteFacturaComponent,
  ListFacturaComponent
  ]
  ,providers: []
  ,exports: []
})
export class FacturaModule {

}
