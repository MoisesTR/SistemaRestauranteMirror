import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class EmpaqueService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createEmpaque(Empaque){

    let params = JSON.stringify(Empaque);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'createEmpaque',params,{headers:headers})
      .map(res => res.json());
  }

  getEmpaque(IdEmpaque){
    return this._http.get(this.url + 'empaque/'+IdEmpaque).map(res => res.json());
  }

  getEmpaques(Habilitado = 1){
    return this._http.get(this.url + 'empaques?Habilitado='+Habilitado).map(res => res.json());
  }

  updateEmpaque(IdEmpaque,Empaque){

    let params = JSON.stringify(Empaque);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'empaque/'+IdEmpaque,params,{headers:headers})
      .map(res => res.json());
  }

  deleteEmpaque(IdEmpaque){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'empaque/'+IdEmpaque,options)
      .map(res => res.json());
  }

}
