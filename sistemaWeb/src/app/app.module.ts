import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { NotFound404Component } from './components/not-found-404/not-found-404.component';
import {MenuModule} from "./components/menu/menu.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { SalidaProductoComponent } from './components/salida-producto/salida-producto.component';
import { InformacionFacturaComponent } from './components/informacion-factura/informacion-factura.component';
import { BuscarGeneralFacturaComponent } from './components/buscar-general-factura/buscar-general-factura.component';


const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent},
  {path:'**',component: NotFound404Component}
]

@NgModule({
  declarations: [
    AppComponent
    , InicioComponent
    , LoginComponent
    , NotFound404Component, InformacionFacturaComponent, BuscarGeneralFacturaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MenuModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

