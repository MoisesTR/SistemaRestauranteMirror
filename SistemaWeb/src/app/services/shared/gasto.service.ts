import { Injectable } from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

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
        return this._http.get(this.url + 'clasificacionesGastos?Habilitado=' + Habilitado);
    }

    getSubclasificacionesByIdClasificacion(IdClasificacion): Observable<any> {
        return this._http.get(this.url + 'subclasificacionesGastosById/' + IdClasificacion);
    }

    getTopProductos(): Observable<any> {
        return this._http.get(this.url + 'topProductos/');
    }

    getGastosPorFiltro(IdClasificacion, IdSubClasificacion = null, FechaInicio, FechaFin): Observable<any> {
        const params = new HttpParams().set('IdClasificacion', IdClasificacion)
            .set('IdSubClasificacion', IdSubClasificacion)
            .set('FechaInicio', FechaInicio)
            .set('FechaFin', FechaFin);
        return this._http.get(this.url + 'gastosPorFiltro/' , {params: params});
    }

}
