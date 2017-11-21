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

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    , DataTablesModule
    , ProductoRoutingModule
    , ReactiveFormsModule
    , SharedModuleModule
  ],
  declarations: [AddTrabajadorComponent, ListTrabajadorComponent, UpdateTrabajadorComponent]
  , providers : [TrabajadorService]
})
export class TrabajadorModule { }
