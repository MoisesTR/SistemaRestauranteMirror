import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { UpdateUsuarioComponent } from './update-usuario/update-usuario.component';
import {HttpModule} from "@angular/http";
import {DataTablesModule} from "angular-datatables";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {UsuarioRoutingModule} from "./usuario.routing.module";
import {TrabajadorService} from "../../services/trabajador.service";
import {RolusuarioService} from "../../services/rolusuario.service";
import {Select2Module} from 'ng2-select2';
import {ListUsuarioComponent} from './list-usuario/list-usuario.component';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    , DataTablesModule
    , UsuarioRoutingModule
    , ReactiveFormsModule
    , Select2Module
  ],
  exports: [],
  declarations: [
    AddUsuarioComponent
    , ListUsuariosComponent
    , UpdateUsuarioComponent
    , ListUsuarioComponent
  ]
  ,providers: [UsuarioService, TrabajadorService, RolusuarioService]
})
export class UsuarioModule { }



