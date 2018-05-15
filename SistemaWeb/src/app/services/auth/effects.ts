import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switch';
import 'rxjs/add/observable/timer';

import {Observable} from 'rxjs/Observable';

import * as ApplicationActions from './action';
import {tap} from 'rxjs/operators';
import {UsuarioService} from '../usuario.service';
import {Router} from '@angular/router';

@Injectable()
export class ApplicationEffects {

    APPLICATION_TIMEOUT_TIME = 1000 * 250;

    @Effect()
    extendApplicationTimeout$ = this.actions$
        .switchMap( ( action: Action ) => Observable.timer(this.APPLICATION_TIMEOUT_TIME) )
        .map(() => new ApplicationActions.LogOut())
        .pipe(
            tap((action : ApplicationActions.LogOut) =>{
                return this.logout();
            })
        )

    constructor( private actions$: Actions
        , private _uuarioService : UsuarioService
        , private _router : Router) {
        console.log(actions$)
    }

    logout() {
        localStorage.clear();
        this._uuarioService.identity = null;
        this._router.navigate(['/login']);
    }

}