import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ProductoService} from '../../services/producto.service';
import {DataTablesModule} from 'angular-datatables';
import {AddProductoComponent} from './add-producto/add-producto.component';
import {ListProductosComponent} from './list-productos/list-productos.component';
import {UpdateProductoComponent} from './update-producto/update-producto.component';
import {ProductoRoutingModule} from './producto.routing.module';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {Select2Module} from 'ng2-select2';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';


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
  declarations: [
  AddProductoComponent
    , ListProductosComponent
    , UpdateProductoComponent
  ]
  ,providers: [ProductoService,  {
    provide: NG_SELECT_DEFAULT_CONFIG,
    useValue: {
      notFoundText: 'No se encontraron resultados'
    }
  }]
  ,exports: []
})
export class ProductoModule {

}
