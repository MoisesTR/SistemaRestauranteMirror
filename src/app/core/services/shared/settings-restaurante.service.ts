import { Injectable } from '@angular/core';
import { Global } from './global';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingRestauranteService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  createdRestaurante(Restaurante): Observable<any> {

    const params = JSON.stringify(Restaurante);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post(this.url + 'restaurantes', params, { headers: headers });
  }

  getRestaurante(IdRestaurantes): Observable<any> {
    return this._http.get(this.url + 'restaurantes/' + IdRestaurantes);
  }

  updateRestaurante(IdRestaurantes, Restaurante): Observable<any> {

    const params = JSON.stringify(Restaurante);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url + 'restaurantes/' + IdRestaurantes, params, { headers: headers });
  }

}