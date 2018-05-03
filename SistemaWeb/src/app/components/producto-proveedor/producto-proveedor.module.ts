import {NgModule} from '@angular/core';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {HttpClientModule} from '@angular/common/http';
import {AddProductoProveedorComponent} from './add-producto-proveedor/add-producto-proveedor.component';
import {ListProductoProveedorComponent} from './list-producto-proveedor/list-producto-proveedor.component';
import {UpdateProductoProveedorComponent} from './update-producto-proveedor/update-producto-proveedor.component';
import {ProductoProveedorRoutingModule} from './producto-proveedor.routing.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {UnidadMedidaService} from '../../services/unidad-medida.service';
import {ModalEmpaqueComponent} from '../modales/modal-empaque/modal-empaque.component';

@NgModule({
  imports: [
     ProductoProveedorRoutingModule
    , FormsModule
    , HttpClientModule
    , DataTablesModule
    , ReactiveFormsModule
    , SharedModuleModule
    , NgSelectModule

  ],
  declarations: [
    AddProductoProveedorComponent
    , ListProductoProveedorComponent
    , UpdateProductoProveedorComponent
  ],
  providers: [
    UnidadMedidaService
      , ModalEmpaqueComponent
  ]
})
export class ProductoProveedorModule { }
