import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {AddfacturaComponent} from './addfactura/addfactura.component';
import {DeleteFacturaComponent} from './delete-factura/delete-factura.component';
import {ListFacturaComponent} from './list-factura/list-factura.component';
import {BusquedafacturasComponent} from './busquedafacturas/busquedafacturas.component';
import {FacturaRoutingModule} from './factura.routing.module';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {FacturaService} from '../../services/shared/factura.service';
import {HttpClientModule} from '@angular/common/http';
import {UpdateFacturaComponent} from './update-factura/update-factura.component';
import {ShowFacturaComponent} from './show-factura/show-factura.component';
import {SummaryFacturasComponent} from './summary-facturas/summary-facturas.component';


@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , HttpClientModule
    , DataTablesModule
    , ReactiveFormsModule
    , FacturaRoutingModule
    , SharedModuleModule
  ],
  declarations: [
      AddfacturaComponent
      , DeleteFacturaComponent
      , ListFacturaComponent
      , ShowFacturaComponent
      , UpdateFacturaComponent
      , BusquedafacturasComponent
      , SummaryFacturasComponent
  ]
  , providers: [FacturaService]
  , exports: []
})

export class FacturaModule {

}
