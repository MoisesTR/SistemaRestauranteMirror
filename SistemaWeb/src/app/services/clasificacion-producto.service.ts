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

  createClasificacionProducto(ClasificacionProducto) : Observable<any> {

    let params = JSON.stringify(ClasificacionProducto);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'clasificacion',params,{headers:headers})
  }

  getClasificacionProducto(IdClasificacion) : Observable<any> {
    return this._http.get(this.url + 'clasificacion/'+IdClasificacion)
  }

  getClasificaciones(Habilitado = 1) : Observable<any> {
    return this._http.get(this.url + 'clasificaciones?Habilitado='+Habilitado)
  }

  getClasificacionesByIdCategoria(Habilitado = 1,IdCategoria) : Observable<any>{
    let params = JSON.stringify(Habilitado);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token'
    });

    return this._http.get(this.url + 'clasificaciones/'+IdCategoria+'/'+Habilitado);
  }

  updateClasificacionProducto(Clasificacion) : Observable<any> {

    let params = JSON.stringify(Clasificacion);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'clasificacion/'+Clasificacion.IdClasificacion,params,{headers:headers})

  }

  deleteClasificacionProducto(IdClasificacion) : Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let body = JSON.stringify({"Habilitado": 0});

    return this._http.request('delete',this.url+'clasificacion/'+IdClasificacion,{headers:headers,body:body})

  }
}
