/*
///Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuRoutingModule } from './menu.routing.module';

//Componentes
import { ProductoComponent } from '../producto/producto.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { ClasificacionComponent } from '../clasificacion/clasificacion.component';
import { SubclasificacionComponent } from '../subclasificacion/subclasificacion.component';
import {DataService} from "../../services/data.service";
import {DataTablesModule} from "angular-datatables";
import { ProveedoresComponent } from '../proveedores/proveedores.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import {CategoriaService} from "../../services/categoria.service";
import {ProductoService} from "../../services/producto.service";
import {SubclasificacionProductoService} from "../../services/subclasificacion-producto.service";
import {ClasificacionProductoService} from "../../services/clasificacion-producto.service";

@NgModule({
  declarations: [
      ProductoComponent,
      CategoriaComponent,
      ClasificacionComponent,
      SubclasificacionComponent,
      ProveedoresComponent,
      UsuarioComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MenuRoutingModule

  ],
  exports: [
    ProductoComponent,
    CategoriaComponent,
    ClasificacionComponent,
    SubclasificacionComponent,
    ProveedoresComponent,
    UsuarioComponent
  ],
  providers: [DataService,CategoriaService,ProductoService,SubclasificacionProductoService,ClasificacionProductoService]
})

export class MenuModule {

}

*/
