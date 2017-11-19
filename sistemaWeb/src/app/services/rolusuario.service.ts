import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RolusuarioService {


  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }


  createRolUsuario(RolUsuario){
    let params = JSON.stringify(RolUsuario);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url + 'rol',params,{headers:headers}).map(res => res.json());
  }

  getRolUsuario(IdRolUsuario){
    return this._http.get(this.url+'rol/',IdRolUsuario).map(res => res.json());
  }

  getRoles(){
    return this._http.get(this.url + 'roles').map(res => res.json());
  }

  updateRol(RolUsuario){

    let params = JSON.stringify(RolUsuario);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.put(this.url + 'rol',params,{headers:headers}).map(res => res.json());
  }

  deleteRol(IdRol){
    let headers =  new Headers({
      'Content-Type' : 'application/json'
      , 'Authorization': 'token'
    });

    let options = new RequestOptions({headers: headers});

    return this._http.delete(this.url+'rol/'+IdRol,options).map(res => res.json());
  }

}
