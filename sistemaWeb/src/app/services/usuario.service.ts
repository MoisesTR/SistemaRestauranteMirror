import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  public url: string;
  public identity;
  public token;
  private usuarioLogeado;
  constructor(private _http: Http) {
    this.url = Global.url;
    this.usuarioLogeado = false;
  }

  registrar(usuario) {
    let params = JSON.stringify(usuario);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(
      this.url+'addUsuario', params, {headers:headers})
      .map(res => res.json());
  }

  setUserLoggedIn(){
    this.usuarioLogeado = true;
  }

  getUserLoggedIn(){
    return this.usuarioLogeado;
  }

  login(usuarioLogin,gettoken=null){

    if(gettoken != null){
      usuarioLogin.gettoken = gettoken;

    }
    let params = JSON.stringify(usuarioLogin);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'login',params,{headers:headers})
      .map(res => res.json());

  }

  login2(usuarioLogin,gettoken=null){

    if(gettoken != null){
      usuarioLogin.gettoken = gettoken;

    }
    let params = JSON.stringify(usuarioLogin);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'signin',params,{headers:headers})
      .map(res => res.json());

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

  createUsuario(Usuario){

    let params = JSON.stringify(Usuario);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'signup',params,{headers:headers})
      .map(res => res.json());
  }

  getUsuarios(){
    return this._http.get(this.url + 'users').map(res => res.json());
  }

}
