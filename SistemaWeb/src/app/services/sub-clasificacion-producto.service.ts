import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SubClasificacionProducto} from '../models/SubClasificacionProducto';

@Injectable()
export class SubClasificacionProductoService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  createSubClasificacionProducto(Subclasificacion) : Observable<any> {

    let params = JSON.stringify(Subclasificacion);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'subclasificacion',params,{headers:headers});
  }

  getSubClasificacionProducto(IdSubclasificacion) : Observable<any> {
    return this._http.get(this.url + 'subclasificacion/'+IdSubclasificacion)
  }

  getSubClasificaciones() : Observable<any> {
    return this._http.get(this.url + 'subclasificaciones');
  }

  getSubClasificacionesByIdClasificacion(IdClasificacion) : Observable<any> {
    return this._http.get(this.url + 'subclasificaciones/'+IdClasificacion);

  }

  updateSubClasificacionProducto(SubClasificacion : SubClasificacionProducto) : Observable<any> {

    let params = JSON.stringify(SubClasificacion);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url+'subclasificacion',params,{headers:headers})

  }

  deleteSubClasificacionProducto(IdSubclasificacion) : Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.request('delete',this.url+'subclasificacion/'+IdSubclasificacion,{headers:headers});
  }

}
