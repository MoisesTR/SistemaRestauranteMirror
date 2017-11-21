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

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    , DataTablesModule
    , UsuarioRoutingModule
    , ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    AddUsuarioComponent
    , ListUsuariosComponent
    , UpdateUsuarioComponent
  ]
  ,providers: [UsuarioService]
})
export class UsuarioModule { }



