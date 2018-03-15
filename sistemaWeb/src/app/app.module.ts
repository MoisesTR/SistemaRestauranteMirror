import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {LoginComponent} from './components/login/login.component';
import {NotFound404Component} from './components/not-found-404/not-found-404.component';
import {MenuModule} from './components/menu/menu.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InformacionFacturaComponent} from './components/informacion-factura/informacion-factura.component';
import {BuscarGeneralFacturaComponent} from './components/buscar-general-factura/buscar-general-factura.component';
import {SharedModuleModule} from './components/shared-module/shared-module.module';
import {DropdownModule} from 'ngx-dropdown';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
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
    BrowserModule
    , HttpClientModule
    , FormsModule
    , RouterModule.forRoot(routes)
    , SharedModuleModule
    , BrowserAnimationsModule
    , MenuModule
    , ReactiveFormsModule
    ,  ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
    ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

