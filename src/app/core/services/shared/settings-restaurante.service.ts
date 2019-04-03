import { Injectable } from '@angular/core';
import { Global } from './global';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Restaurante} from '@app/models/Restaurante';
import {map} from 'rxjs/operators';

@Injectable()
export class SettingRestauranteService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  createdRestaurante(restaurante): Observable<any> {

    const params = JSON.stringify(restaurante);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post(this.url + 'restaurantes', params, { headers: headers });
  }

  getRestaurante(IdRestaurante): Observable<any> {
    return this._http.get(this.url + 'restaurantes/' + IdRestaurante);
  }

  getRestaurantes(habilitado = 1): Observable<any> {
      return this._http.get(this.url + 'restaurantes?Habilitado=' + habilitado);
  }

  updateRestaurante(IdRestaurantes, restaurante): Observable<any> {

    const params = JSON.stringify(restaurante);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url + 'restaurantes/' + IdRestaurantes, params, { headers: headers });
  }

}