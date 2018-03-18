import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModulePro, MDBSpinningPreloader} from './typescripts/pro/index';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {NotFound404Component} from './components/not-found-404/not-found-404.component';
import {SharedModuleModule} from './components/shared-module/shared-module.module';
import {MenuModule} from './components/menu/menu.module';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path:'**',component: NotFound404Component}
]


@NgModule({
  declarations: [
    AppComponent
      , LoginComponent
      , NotFound404Component
  ],
  imports: [
      BrowserModule
      , BrowserAnimationsModule
      , MDBBootstrapModulePro.forRoot()
      , HttpClientModule
      , FormsModule
      , RouterModule.forRoot(routes)
      , SharedModuleModule
      , MenuModule
      , ReactiveFormsModule
  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
