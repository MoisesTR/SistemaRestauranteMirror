import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClasificacionProductoService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createClasificacionProducto(ClasificacionProducto){

    let params = JSON.stringify(ClasificacionProducto);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'clasificacion',params,{headers:headers})
      .map(res => res.json());
  }

  getClasificacionProducto(IdClasificacion){
    return this._http.get(this.url + 'clasificacion/'+IdClasificacion).map(res => res.json());
  }

  getClasificaciones(Habilitado = 1){
    return this._http.get(this.url + 'clasificaciones?Habilitado='+Habilitado).map(res => res.json());
  }

  updateClasificacionProducto(IdClasificacion,Clasificacion){

    let params = JSON.stringify(Clasificacion);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'clasificacion/'+IdClasificacion,params,{headers:headers})
      .map(res => res.json());

  }

  deleteClasificacionProducto(IdClasificacion){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let body = JSON.stringify(
      {
        "Habilitado": 0

      }
    );

    let options = new RequestOptions({headers:headers,body:body});
    return this._http.delete(this.url+'clasificacion/'+IdClasificacion,options)
      .map(res => res.json());
  }
}
