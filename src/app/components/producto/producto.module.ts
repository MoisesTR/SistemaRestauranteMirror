import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AddProductoComponent} from './add-producto/add-producto.component';
import {ListProductosComponent} from './list-productos/list-productos.component';
import {UpdateProductoComponent} from './update-producto/update-producto.component';
import {ProductoRoutingModule} from './producto.routing.module';
import {SharedModule} from '../shared-module/shared.module';

@NgModule({
  imports: [
    SharedModule
      , ProductoRoutingModule
  ],
  declarations: [
  AddProductoComponent
    , ListProductosComponent
    , UpdateProductoComponent
]
  , exports: []
  , schemas: [ NO_ERRORS_SCHEMA ]
})

export class ProductoModule {

}
