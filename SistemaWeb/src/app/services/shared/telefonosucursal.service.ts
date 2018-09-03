import {Injectable} from '@angular/core';
import {Global} from './global';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TelefonosucursalService {

  public url: string;

  constructor(private _http: Http) {
    this.url = Global.url;
  }

  createTelefonoSucursal(TelefonoSucursal){

    let params = JSON.stringify(TelefonoSucursal);
    let headers = new Headers({'Content-Type':'application/json'});

    let body = JSON.stringify(
      {
        "NumeroTelefono": TelefonoSucursal.NumeroTelefono
      }
    );
    return this._http.post(this.url+'sucursal/'+TelefonoSucursal.IdSucursal+'/telefono',params,{headers:headers,body:body})
      .map(res => res.json());
  }

  getSucursal(IdSucursal){
    return this._http.get(this.url + 'sucursal/'+IdSucursal).map(res => res.json());
  }

  getSucursales(Habilitado=1){
    return this._http.get(this.url + 'sucursales?Habilitado='+Habilitado).map(res => res.json());
  }

  getTelefonosSucursal(IdSucursal){
    return this._http.get(this.url + 'sucursal/'+IdSucursal+'/telefonos').map(res => res.json());
  }

  getTelefonosSucursales(Habilitado = 1) {
    return this._http.get(this.url + 'sucursales/telefonos?Habilitado='+Habilitado).map(res => res.json())
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
