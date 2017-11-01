///Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuRoutingModule } from './menu.routing.module';
import {Ng2SmartTableModule} from "ng2-smart-table";

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
import {DataTablesModule} from "angular-datatables";
import {AddProductoComponent} from "../producto/add-producto/add-producto.component";
import {AddUsuarioComponent} from "../usuario/add-usuario/add-usuario.component";
import {EmpaqueComponent} from "../empaque/empaque.component";
import {EmpaqueService} from "../../services/empaque.service";
import {BodegaSucursalComponent} from "../bodega-sucursal/bodega-sucursal.component";
import {BodegaSucursalService} from "../../services/bodega-sucursal.service";
import {TrabajadorComponent} from "../trabajador/trabajador.component";
import {TrabajadorService} from "../../services/trabajador.service";


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
    , AddProductoComponent
    , AddUsuarioComponent
    , EmpaqueComponent
    , BodegaSucursalComponent
    , TrabajadorComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MenuRoutingModule,
    DataTablesModule,

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
    , AddProductoComponent
    , AddUsuarioComponent
    , EmpaqueComponent
    , BodegaSucursalComponent
    , TrabajadorComponent

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
    , EmpaqueService
    , BodegaSucursalService
    , TrabajadorService


  ]
})

export class MenuModule {

}

