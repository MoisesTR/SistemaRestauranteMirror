import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuModule} from './components/menu/menu.module';
import {SharedModuleModule} from './components/shared-module/shared-module.module';
import {LoginComponent} from './components/login/login.component';
import {NotFound404Component} from './components/not-found-404/not-found-404.component';
import {MDBBootstrapModulesPro, MDBSpinningPreloader, ToastModule} from 'ng-uikit-pro-standard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './services/auth/token.interceptor';
import { GastosComponent } from './components/gastos/gastos.component';

// Rutas principales
const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '**', component: NotFound404Component},
    {path: 'notfound', component: NotFound404Component}
];

@NgModule({
  declarations: [
    AppComponent
      , LoginComponent
      , NotFound404Component, GastosComponent
  ],
  imports: [
    BrowserModule
    , BrowserAnimationsModule
    , RouterModule.forRoot(routes)
    , SharedModuleModule
    , MenuModule
    , ToastModule.forRoot({maxOpened : 1, timeOut : 2000, preventDuplicates : true})
    , MDBBootstrapModulesPro.forRoot()
    , AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),

  ],
    schemas: [ NO_ERRORS_SCHEMA ],
  providers: [MDBSpinningPreloader, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent],

})
export class AppModule { }
