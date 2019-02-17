import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {UsuarioService} from '../shared/usuario.service';

@Injectable()
export class AuthService {

  public jwtHelper;
  constructor(
      private _router: Router,
      private _usuarioService: UsuarioService
  ) {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    this.jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    // Check whether the token is expired and return
    // true or false
    return token ? (!this.jwtHelper.isTokenExpired(token)) : false;
    // return true;
  }

  public logout(): void {
      localStorage.clear();
      this._usuarioService.identity = null;
      this._router.navigate(['/login']);
  }

}
