import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BodegaSucursalService{

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  createBodegaSucursal(BodegaSucursal) : Observable<any> {

    let params = JSON.stringify(BodegaSucursal);
    let headers = new HttpHeaders({'Content-Type':''});

    return this._http.post(this.url+'bodegasucursal',params,{headers:headers})
  }

  getBodegaSucursal(IdBodegaSucursal) : Observable<any> {
    return this._http.get(this.url + 'bodegasucursal/'+IdBodegaSucursal)
  }

  getBodegaSucursales(): Observable<any> {
    return this._http.get(this.url + 'bodegasucursales')
  }

  updateBodegaSucursal(IdBodegaSucursal,BodegaSucursal) : Observable<any> {

    let params = JSON.stringify(BodegaSucursal);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'bodegasucursal/'+IdBodegaSucursal,params,{headers:headers})
  }

  deleteBodegaSucursal(IdBodegaSucursal) : Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.request('delete',this.url+'bodegasucursal/'+IdBodegaSucursal,{headers:headers});
  }

}
