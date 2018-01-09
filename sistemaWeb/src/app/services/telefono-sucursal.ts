import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TelefonoSucursal {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createTelefonoSucursal(Sucursal){

    let params = JSON.stringify(Sucursal);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'sucursal',params,{headers:headers})
      .map(res => res.json());
  }

  getTelefonoSucursal(IdSucursal){
    return this._http.get(this.url + 'sucursal/'+IdSucursal).map(res => res.json());
  }

  getTelefonosSucursal(Habilitado=1){
    return this._http.get(this.url + 'sucursales?Habilitado='+Habilitado).map(res => res.json());
  }

  updateTelefonoSucursal(IdSucursal,Sucursal){

    let params = JSON.stringify(Sucursal);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'sucursal/'+IdSucursal,params,{headers:headers})
      .map(res => res.json());
  }

  deleteTelefonoSucursal(IdSucursal){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'sucursal/'+IdSucursal,options)
      .map(res => res.json());
  }

}
