import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProveedorService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createProveedor(Proveedor){

    let params = JSON.stringify(Proveedor);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'createProveedor',params,{headers:headers})
      .map(res => res.json());
  }

  getProveedor(IdProveedor){
    return this._http.get(this.url + 'proveedor/'+IdProveedor).map(res => res.json());
  }

  getProveedores(){
      return this._http.get(this.url + 'proveedores').map(res => res.json());
  }

  updateProveedor(IdProveedor,Proveedor){

    let params = JSON.stringify(Proveedor);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'proveedor/'+IdProveedor,params,{headers:headers})
      .map(res => res.json());
  }

  deleteProveedor(IdProveedor){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'proveedor/'+IdProveedor,options)
      .map(res => res.json());
  }
}