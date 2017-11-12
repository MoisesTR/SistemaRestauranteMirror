import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class SubClasificacionProductoService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createSubClasificacionProducto(Subclasificacion){

    let params = JSON.stringify(Subclasificacion);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'subclasificacion',params,{headers:headers})
      .map(res => res.json());
  }

  getSubClasificacionProducto(IdSubclasificacion){
    return this._http.get(this.url + 'subclasificacion/'+IdSubclasificacion).map(res => res.json());
  }

  getSubClasificaciones(){
    return this._http.get(this.url + 'subclasificaciones').map(res => res.json());
  }

  updateSubClasificacionProducto(SubClasificacion){

    let params = JSON.stringify(SubClasificacion);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'subclasificacion',params,{headers:headers})
      .map(res => res.json());

  }

  deleteSubClasificacionProducto(IdSubclasificacion){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'subclasificacion/'+IdSubclasificacion,options)
      .map(res => res.json());
  }

}
