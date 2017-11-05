///Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuRoutingModule } from './menu.routing.module';
import {DataTablesModule} from "angular-datatables";


//Componentes
import {ClasificacionProductoComponent} from "../clasificacion-producto/clasificacion-producto.component";
import {ProveedorComponent} from "../proveedor/proveedor.component";
import {SucursalComponent} from "../sucursal/sucursal.component";
import {CategoriaProductoComponent} from "../categoria-producto/categoria-producto.component";
import {SubClasificacionProductoComponent} from "../sub-clasificacion-producto/sub-clasificacion-producto.component";
import {EnvaseComponent} from "../envase/envase.component";
import {TrabajadorComponent} from "../trabajador/trabajador.component";
import {BodegaSucursalComponent} from "../bodega-sucursal/bodega-sucursal.component";
import {EmpaqueComponent} from "../empaque/empaque.component";
import {AddUsuarioComponent} from "../usuario/add-usuario/add-usuario.component";
import {MenuComponent} from "./menu.component";

//Servicios
import {CategoriaProductoService } from '../../services/categoria-producto.service';
import {ClasificacionProductoService} from "../../services/clasificacion-producto.service";
import {SubClasificacionProductoService} from "../../services/sub-clasificacion-producto.service";
import {ProveedorService} from '../../services/proveedor.service';
import {SucursalService} from '../../services/sucursal.service';
import {UsuarioService} from '../../services/usuario.service';
import {EnvaseService} from '../../services/envase.service';
import {EmpaqueService} from "../../services/empaque.service";
import {BodegaSucursalService} from "../../services/bodega-sucursal.service";
import {TrabajadorService} from "../../services/trabajador.service";
import {ProductoModule} from "../producto/producto.module";
import {ShowErrorsComponent} from "../show-errors.component";
import {TelephoneNumberFormatValidatorDirective} from "../../validadores/telephoneNumber";
import {BirthYearValidatorDirective} from "../../validadores/birthYear";
import {UsuarioRoutingModule} from "../usuario/usuario.routing.module";
import {CargoComponent} from "../cargo/cargo.component";


@NgModule({
  declarations: [
    CategoriaProductoComponent
    , ClasificacionProductoComponent
    , SubClasificacionProductoComponent
    , ProveedorComponent
    , SucursalComponent
    , EnvaseComponent
    , AddUsuarioComponent
    , EmpaqueComponent
    , BodegaSucursalComponent
    , TrabajadorComponent
    , SucursalComponent
    , MenuComponent
    , ShowErrorsComponent
    , TelephoneNumberFormatValidatorDirective
    , BirthYearValidatorDirective
    , CargoComponent

  ],
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    , MenuRoutingModule
    , ProductoModule
    , ReactiveFormsModule
    , DataTablesModule
    , UsuarioRoutingModule



  ],
  exports: [
    MenuComponent
    , TelephoneNumberFormatValidatorDirective
    , BirthYearValidatorDirective

  ],
  providers: [
    CategoriaProductoService
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

