import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ProductoService} from '../../services/shared/producto.service';
import {DataTablesModule} from 'angular-datatables';
import {AddProductoComponent} from './add-producto/add-producto.component';
import {ListProductosComponent} from './list-productos/list-productos.component';
import {UpdateProductoComponent} from './update-producto/update-producto.component';
import {ProductoRoutingModule} from './producto.routing.module';
import {SharedModuleModule} from '../shared-module/shared-module.module';


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
  declarations: [
  AddProductoComponent
    , ListProductosComponent
    , UpdateProductoComponent
]
  , providers: [ProductoService ]
  , exports: []
})
export class ProductoModule {

}
