import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {AppComponent} from './app.component';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {SharedModule} from './components/shared-module/shared.module';
import {LoginComponent} from './components/login/login.component';
import {NotFound404Component} from './components/not-found-404/not-found-404.component';
import {MDBBootstrapModulesPro, MDBSpinningPreloader, ToastModule} from 'ng-uikit-pro-standard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from './services/auth/token.interceptor.service';
import {ServiceModule} from './services/service.module';
import {MenuComponent} from './components/menu/menu.component';
import {ROUTES} from './app.routes';

@NgModule({
    declarations: [
        AppComponent
        , LoginComponent
        , MenuComponent
        , NotFound404Component
    ],
    imports: [
        BrowserModule
        , BrowserAnimationsModule
        , RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
        , SharedModule
        , ServiceModule
        , MDBBootstrapModulesPro.forRoot()
        , ToastModule.forRoot({maxOpened: 1, timeOut: 2000, preventDuplicates: true})
        , AgmCoreModule.forRoot({
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
            apiKey: 'Your_api_key'
        }),

    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [MDBSpinningPreloader, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    }],
    bootstrap: [AppComponent],

})
export class AppModule {
}
