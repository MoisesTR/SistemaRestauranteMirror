import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TrabajadorService{

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }


  createTrabajador(Trabajador){

    let params = JSON.stringify(Trabajador);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'trabajador',params,{headers:headers})
      .map(res => res.json());
  }

  getTrabajador(IdTrabajador){
    return this._http.get(this.url + 'trabajador/'+IdTrabajador).map(res => res.json());
  }

  getTrabajadores(Habilitado = 1){
    return this._http.get(this.url + 'trabajadores?Habilitado='+Habilitado).map(res => res.json());
  }

  updateTrabajador(IdTrabjador,Trabajador){

    let params = JSON.stringify(Trabajador);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'trabajador/'+IdTrabjador,params,{headers:headers})
      .map(res => res.json());
  }

  deleteTrabajador(IdTrabajador){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'trabajador/'+IdTrabajador,options)
      .map(res => res.json());
  }

}
