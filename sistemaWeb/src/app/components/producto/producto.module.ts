import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ProductoService} from "../../services/producto.service";
import {DataTablesModule} from "angular-datatables";
import { AddProductoComponent } from './add-producto/add-producto.component';
import { ListProductosComponent } from './list-productos/list-productos.component';
import { UpdateProductoComponent } from './update-producto/update-producto.component';
import {ProductoRoutingModule} from "./producto.routing.module";
import {ShowErrorsComponent} from "../show-errors.component";
import {SharedModuleModule} from "../shared-module/shared-module.module";
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    , DataTablesModule
    , ProductoRoutingModule
    , ReactiveFormsModule
    , SharedModuleModule
    , FileUploadModule
  ],
  declarations: [
  AddProductoComponent
    , ListProductosComponent
    , UpdateProductoComponent
  ]
  ,providers: [ProductoService]
  ,exports: []
})
export class ProductoModule {

}
