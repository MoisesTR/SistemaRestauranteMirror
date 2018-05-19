import {ToastModule} from './typescripts/pro/alerts/toast/toast.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MDBBootstrapModule} from './typescripts/free';
import {MDBBootstrapModulePro, MDBSpinningPreloader} from './typescripts/pro/index';
import {AgmCoreModule} from '@agm/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuModule} from './components/menu/menu.module';
import {SharedModuleModule} from './components/shared-module/shared-module.module';
import {LoginComponent} from './components/login/login.component';
import {NotFound404Component} from './components/not-found-404/not-found-404.component';
import {UserIdleModule} from 'angular-user-idle';
import { ModalClasificacionComponent } from './components/modales/modal-clasificacion/modal-clasificacion.component';


//Rutas principales
const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path:'**',component: NotFound404Component},
    {path:'notfound',component: NotFound404Component}
]

@NgModule({
  declarations: [
    AppComponent
      , LoginComponent
      , NotFound404Component, ModalClasificacionComponent
  ],
  imports: [
    BrowserModule
    , BrowserAnimationsModule
    , RouterModule.forRoot(routes)
    , SharedModuleModule
    , MenuModule
    , ToastModule.forRoot({maxOpened : 1,timeOut : 2000, preventDuplicates : true})
    , MDBBootstrapModule.forRoot()
    , MDBBootstrapModulePro.forRoot()
      , UserIdleModule.forRoot({idle: 600, timeout: 1, ping: 600})
    , AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),

  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
