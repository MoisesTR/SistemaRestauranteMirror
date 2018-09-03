import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable()
export class AuthService {

  public jwtHelper;
  constructor() {}

  public isAuthenticated(): boolean {
    this.jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    // Check whether the token is expired and return
    // true or false
    return token != null ? (!this.jwtHelper.isTokenExpired(token)) : false;
    // return true;
  }

}
