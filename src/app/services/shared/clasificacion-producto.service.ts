import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ClasificacionProductoService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  createClasificacionProducto(ClasificacionProducto): Observable<any> {

    const params = JSON.stringify(ClasificacionProducto);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'clasificacion', params, {headers: headers});
  }

  getClasificacionProducto(IdClasificacion): Observable<any> {
    return this._http.get(this.url + 'clasificacion/' + IdClasificacion);
  }

  getClasificaciones(Habilitado = 1): Observable<any> {
    return this._http.get(this.url + 'clasificaciones?Habilitado=' + Habilitado);
  }

  getClasificacionesByIdCategoria(Habilitado = 1, IdCategoria): Observable<any> {
    return this._http.get(this.url + 'clasificaciones/' + IdCategoria + '/' + Habilitado);
  }

  updateClasificacionProducto(Clasificacion): Observable<any> {

    const params = JSON.stringify(Clasificacion);
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url + 'clasificacion/' + Clasificacion.IdClasificacion, params, {headers: headers});

  }

  deleteClasificacionProducto(IdClasificacion): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    const body = JSON.stringify({'Habilitado': false});

    return this._http.request('delete', this.url + 'clasificacion/' + IdClasificacion, {headers: headers, body: body});

  }
}
