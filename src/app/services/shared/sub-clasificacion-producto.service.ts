import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SubClasificacionProducto} from '../../models/SubClasificacionProducto';

@Injectable()
export class SubClasificacionProductoService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  createSubClasificacionProducto(Subclasificacion): Observable<any> {

    const params = JSON.stringify(Subclasificacion);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'subclasificacion', params, {headers: headers});
  }

  getSubClasificacionProducto(IdSubClasificacion): Observable<any> {
    return this._http.get(this.url + 'subclasificacion/' + IdSubClasificacion);
  }

  getSubClasificaciones(Habilitado = 1): Observable<any> {
    return this._http.get(this.url + 'subclasificaciones?Habilitado=' + Habilitado);
  }

  getSubClasificacionesByIdClasificacion(IdClasificacion): Observable<any> {
    return this._http.get(this.url + 'subclasificaciones/' + IdClasificacion);

  }

  updateSubClasificacionProducto(SubClasificacion: SubClasificacionProducto): Observable<any> {

    const params = JSON.stringify(SubClasificacion);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url + 'subclasificacion/' + SubClasificacion.IdSubClasificacion, params, {headers: headers});

  }

  deleteSubclasificacion(IdSubClasificacion): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token'
    });

      const body = JSON.stringify({'Habilitado': false});

    return this._http.request('delete', this.url + 'subclasificacion/' + IdSubClasificacion, {headers: headers, body: body});

  }

}
