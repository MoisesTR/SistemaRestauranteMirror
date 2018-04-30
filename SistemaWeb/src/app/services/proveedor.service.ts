import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProveedorService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  createProveedor(Proveedor) : Observable<any> {

    let params = JSON.stringify(Proveedor);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'proveedor',params,{headers:headers})
  }

  getProveedor(IdProveedor) : Observable<any> {
    return this._http.get(this.url + 'proveedor/'+IdProveedor)
  }

  getProveedores(Habilitado = 1) : Observable<any> {
      return this._http.get(this.url + 'proveedores?Habilitado='+Habilitado)
  }

  updateProveedor(Proveedor) : Observable<any> {

    let params = JSON.stringify(Proveedor);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'proveedor',params,{headers:headers})
  }

  deleteProveedor(IdProveedor) : Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let body = JSON.stringify({"Habilitado": 0});

    return this._http.request('delete',this.url+'proveedor/'+IdProveedor,{headers:headers,body:body})
  }
}
