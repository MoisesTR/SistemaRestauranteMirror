import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddTrabajadorComponent} from './add-trabajador/add-trabajador.component';
import {ListTrabajadorComponent} from './list-trabajador/list-trabajador.component';
import {UpdateTrabajadorComponent} from './update-trabajador/update-trabajador.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ProductoRoutingModule} from '../producto/producto.routing.module';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {TrabajadorService} from '../../services/shared/trabajador.service';
import {CargoService} from '../../services/shared/cargo.service';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , DataTablesModule
    , ProductoRoutingModule
    , ReactiveFormsModule
    , SharedModuleModule
    , NgSelectModule
  ],
  declarations: [AddTrabajadorComponent, ListTrabajadorComponent, UpdateTrabajadorComponent]
  , providers : [TrabajadorService, CargoService]
})
export class TrabajadorModule { }
