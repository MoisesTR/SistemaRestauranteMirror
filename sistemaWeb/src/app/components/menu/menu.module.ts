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
import {ReporteComponent} from "../reporte/reporte.component";
import {TrasladoProductoComponent} from "../traslado-producto/traslado-producto.component";
import {UploadService} from "../../services/upload.service";
import {ProductoProveedorComponent} from "../producto-proveedor/producto-proveedor.component";
import {ProductoProveedorService} from "../../services/producto-proveedor.service";
import {RolusuarioComponent} from "../rolusuario/rolusuario.component";
import {HabilitadosComponent} from "../habilitados/habilitados.component";
import {UnidadmedidaComponent} from "../unidadmedida/unidadmedida.component";
import {FacturaModule} from "../factura/factura.module";


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
    , ReporteComponent
    , TrasladoProductoComponent
    , ProductoProveedorComponent
    , RolusuarioComponent
    , HabilitadosComponent
    , UnidadmedidaComponent


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
    , FacturaModule



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
    , UploadService
    , ProductoProveedorService

  ]
})

export class MenuModule {

}

