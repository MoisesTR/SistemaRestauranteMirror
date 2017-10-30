import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { NotFound404Component } from './components/not-found-404/not-found-404.component';
import { MenuComponent } from './components/menu/menu.component';
import {MenuModule} from "./components/menu/menu.module";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { DataTablesModule } from 'angular-datatables';



const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'regitro-usuario', component: RegistroUsuarioComponent},
  {path:'**',component: NotFound404Component}
]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    NotFound404Component,
    MenuComponent,
    RegistroUsuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MenuModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
