import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EmpaqueService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  createEmpaque(Empaque) : Observable<any> {

    let params = JSON.stringify(Empaque);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'empaque',params,{headers:headers})
  }

  getEmpaque(IdEmpaque) : Observable<any> {
    return this._http.get(this.url + 'empaque/'+IdEmpaque)
  }

  getEmpaques(Habilitado = 1) : Observable<any> {
    return this._http.get(this.url + 'empaques?Habilitado='+Habilitado)
  }

  updateEmpaque(Empaque) : Observable<any> {

    let params = JSON.stringify(Empaque);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'empaque/'+Empaque.IdEmpaque,params,{headers:headers})
  }

  deleteEmpaque(IdEmpaque) : Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let body = JSON.stringify({"Habilitado": 0});

    return this._http.request('delete',this.url+'empaque/'+IdEmpaque,{headers:headers,body:body})
  }

}
