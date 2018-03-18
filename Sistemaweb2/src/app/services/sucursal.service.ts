import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Sucursal} from '../models/Sucursal';

@Injectable()
export class SucursalService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  createSucursal(Sucursal) : Observable<any> {

    let params = JSON.stringify(Sucursal);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'sucursal',params,{headers:headers})
  }

  getSucursal(IdSucursal) : Observable<any>{
    return this._http.get(this.url + 'sucursal/'+IdSucursal)
  }

  getSucursales(Habilitado=1) : Observable<any> {
    return this._http.get(this.url + 'sucursales?Habilitado='+Habilitado)
  }

  updateSucursal(Sucursal) : Observable<any> {

    let params = JSON.stringify(Sucursal);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'sucursal/'+Sucursal.IdSucursal,params,{headers:headers})
  }

  deleteSucursal(IdSucursal) : Observable<any> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    // return this._http.delete(this.url+'sucursal/'+IdSucursal,options)
    //   .map(res => res.json());
    return null;
  }

}
