import { Injectable } from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class GastoService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  createGasto(gasto): Observable<any> {
    const params = JSON.stringify(gasto);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

      return this._http.post(this.url + 'gasto', params, { headers : headers });
  }

    getGasto(IdGasto): Observable<any> {
        return this._http.get(this.url + 'gasto/' + IdGasto);
    }

    getGastos(Habilitado = 1): Observable<any> {
        return this._http.get(this.url + 'gasto?Habilitado=' + Habilitado);
    }

    getClasificacionesGasto(Habilitado = 1): Observable<any> {
        return this._http.get(this.url + 'clasificacionesGastos=' + Habilitado);
    }

    getSubclasificacionesByIdClasificacion(Habilitado = 1): Observable<any> {
        return this._http.get(this.url + 'gasto?Habilitado=' + Habilitado);
    }

}
