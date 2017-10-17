///Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuRoutingModule } from './menu.routing.module';

//Componentes
import {ClasificacionProductoComponent} from "../clasificacion-producto/clasificacion-producto.component";
import {ProductoComponent} from "../producto/producto.component";
import {ProveedorComponent} from "../proveedor/proveedor.component";
import {SucursalComponent} from "../sucursal/sucursal.component";
import {CategoriaProductoComponent} from "../categoria-producto/categoria-producto.component";
import {UsuarioComponent} from "../usuario/usuario.component";
import {SubClasificacionProductoComponent} from "../sub-clasificacion-producto/sub-clasificacion-producto.component";
import {EnvaseComponent} from "../envase/envase.component";


//Servicios
import {ProductoService} from '../../services/producto.service';
import {CategoriaProductoService } from '../../services/categoria-producto.service';
import {ClasificacionProductoService} from "../../services/clasificacion-producto.service";
import {SubClasificacionProductoService} from "../../services/sub-clasificacion-producto.service";
import {ProveedorService} from '../../services/proveedor.service';
import {SucursalService} from '../../services/sucursal.service';
import {UsuarioService} from '../../services/usuario.service';
import {EnvaseService} from '../../services/envase.service';


@NgModule({
  declarations: [
      ProductoComponent
    , CategoriaProductoComponent
    , ClasificacionProductoComponent
    , SubClasificacionProductoComponent
    , ProveedorComponent
    , SucursalComponent
    , UsuarioComponent
    , EnvaseComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MenuRoutingModule

  ],
  exports: [
    ProductoComponent
    , CategoriaProductoComponent
    , ClasificacionProductoComponent
    , SubClasificacionProductoComponent
    , ProveedorComponent
    , SucursalComponent
    , UsuarioComponent
    , EnvaseComponent

  ],
  providers: [
    ProductoService
    , CategoriaProductoService
    , ClasificacionProductoService
    , SubClasificacionProductoService
    , ProveedorService
    , SucursalService
    , UsuarioService
    , EnvaseService

  ]
})

export class MenuModule {

}

