import {Injectable} from '@angular/core';
import {Global} from './global';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UsuarioService {

  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  login(usuarioLogin,gettoken=null) : Observable<any> {

    if(gettoken != null){
      usuarioLogin.gettoken = gettoken;
    }

    let params = JSON.stringify(usuarioLogin);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'login',params,{headers:headers})
  }

  login2(usuarioLogin,gettoken=null) : Observable<any> {

    if(gettoken != null){
      usuarioLogin.gettoken = gettoken;
    }

    let params = JSON.stringify(usuarioLogin);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'signin',params,{headers:headers})

  }
  getIdentity() {

    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {

    let token = localStorage.getItem('token')

    if(token!="undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  createUsuario(Usuario) : Observable<any> {

    let params = JSON.stringify(Usuario);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'signup',params,{headers:headers});
  }

  getUsuarios() : Observable<any> {
    return this._http.get(this.url + 'users');
  }

  getPantallasUsuario(IdUsuario) : Observable<any> {

      return this._http.get(this.url + 'pantallas/'+IdUsuario);
  }



}
