import { Injectable } from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {UsuarioService} from '../usuario.service';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  public usuarioService : UsuarioService
  constructor(public jwtHelper: JwtHelper) {}

  // ...
  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    // Check whether the token is expired and return
    // true or false

    return token != null ? (!this.jwtHelper.isTokenExpired(token)) : false;
  }


}
