import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SucursalService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createSucursal(Sucursal){

    let params = JSON.stringify(Sucursal);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'sucursal',params,{headers:headers})
      .map(res => res.json());
  }

  getSucursal(IdSucursal){
    return this._http.get(this.url + 'sucursal/'+IdSucursal).map(res => res.json());
  }

  getSucursales(){
    return this._http.get(this.url + 'sucursales').map(res => res.json());
  }

  updateSucursal(IdSucursal,Sucursal){

    let params = JSON.stringify(Sucursal);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'sucursal/'+IdSucursal,params,{headers:headers})
      .map(res => res.json());
  }

  deleteSucursal(IdSucursal){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'sucursal/'+IdSucursal,options)
      .map(res => res.json());
  }

}
