import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BodgaSucursalService{

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }


  createBodegaSucursal(BodegaSucursal){

    let params = JSON.stringify(BodegaSucursal);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'bodegasucursal',params,{headers:headers})
      .map(res => res.json());
  }

  getBodegaSucursal(IdBodegaSucursal){
    return this._http.get(this.url + 'bodegasucursal/'+IdBodegaSucursal).map(res => res.json());
  }

  getBodegaSucursales(){
    return this._http.get(this.url + 'bodegasucursales').map(res => res.json());
  }

  updateBodegaSucursal(IdBodegaSucursal,BodegaSucursal){

    let params = JSON.stringify(BodegaSucursal);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'bodegasucursal/'+IdTrabjador,params,{headers:headers})
      .map(res => res.json());
  }

  deleteBodegaSucursal(IdBodegaSucursal){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'bodegasucursal/'+IdBodegaSucursal,options)
      .map(res => res.json());
  }

}