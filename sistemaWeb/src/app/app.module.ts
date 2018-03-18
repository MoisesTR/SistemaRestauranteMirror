import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NotFound404Component} from './components/not-found-404/not-found-404.component';
import {MenuModule} from './components/menu/menu.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModuleModule} from './components/shared-module/shared-module.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MDBBootstrapModulePro} from './typescripts/pro/index';

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
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

