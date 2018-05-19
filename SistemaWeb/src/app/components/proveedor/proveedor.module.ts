import {NgModule} from '@angular/core';
import {AddProveedorComponent} from './add-proveedor/add-proveedor.component';
import {UpdateProveedorComponent} from './update-proveedor/update-proveedor.component';
import {ListProveedorComponent} from './list-proveedor/list-proveedor.component';
import {HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {ProveedorRoutingModule} from './proveedor.routing.module';

@NgModule({
  imports: [
      ProveedorRoutingModule
      , FormsModule
      , HttpClientModule
      , DataTablesModule
      , ReactiveFormsModule
      , SharedModuleModule
      , NgSelectModule
  ],
  declarations: [AddProveedorComponent, UpdateProveedorComponent, ListProveedorComponent]
})
export class ProveedorModule { }
