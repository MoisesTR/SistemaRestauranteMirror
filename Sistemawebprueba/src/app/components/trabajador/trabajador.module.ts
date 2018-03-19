import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTrabajadorComponent } from './add-trabajador/add-trabajador.component';
import { ListTrabajadorComponent } from './list-trabajador/list-trabajador.component';
import { UpdateTrabajadorComponent } from './update-trabajador/update-trabajador.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {DataTablesModule} from "angular-datatables";
import {ProductoRoutingModule} from "../producto/producto.routing.module";
import {SharedModuleModule} from "../shared-module/shared-module.module";
import {TrabajadorService} from "../../services/trabajador.service";
import {CargoService} from "../../services/cargo.service";
import {Select2Module} from 'ng2-select2';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    , DataTablesModule
    , ProductoRoutingModule
    , ReactiveFormsModule
    , SharedModuleModule
    , Select2Module
    , NgSelectModule
  ],
  declarations: [AddTrabajadorComponent, ListTrabajadorComponent, UpdateTrabajadorComponent]
  , providers : [TrabajadorService, CargoService]
})
export class TrabajadorModule { }
