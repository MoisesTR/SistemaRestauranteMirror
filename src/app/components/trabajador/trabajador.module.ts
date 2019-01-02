import {NgModule} from '@angular/core';
import {AddTrabajadorComponent} from './add-trabajador/add-trabajador.component';
import {ListTrabajadorComponent} from './list-trabajador/list-trabajador.component';
import {UpdateTrabajadorComponent} from './update-trabajador/update-trabajador.component';
import {ProductoRoutingModule} from '../producto/producto.routing.module';
import {SharedModule} from '../shared-module/shared.module';

@NgModule({
  imports: [
    SharedModule
    , ProductoRoutingModule
  ],
  declarations: [
    AddTrabajadorComponent
    , ListTrabajadorComponent
    , UpdateTrabajadorComponent
  ]
})
export class TrabajadorModule { }
