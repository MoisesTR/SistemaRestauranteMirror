///Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuRoutingModule } from './menu.routing.module';

//Componentes
import { ProductoComponent } from '../producto/producto.component';
import { CategoriaProductoComponent } from '../categoria-producto/categoria-producto.component';

//Servicios
import {ClasificacionProductoService} from "../../services/clasificacion-producto.service";
import {SubClasificacionProductoService} from "../../services/sub-clasificacion-producto.service";
import {ProductoService} from "../../services/producto.service";

@NgModule({
  declarations: [
      ProductoComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MenuRoutingModule

  ],
  exports: [
    ProductoComponent,
    CategoriaProductoComponent,

  ],
  providers: [  ProductoService
                , SubClasificacionProductoService
                , ClasificacionProductoService
  ]
})

export class MenuModule {

}

