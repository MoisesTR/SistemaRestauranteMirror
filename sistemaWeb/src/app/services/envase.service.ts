import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EnvaseService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createEnvase(Envase){

    let params = JSON.stringify(Envase);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'createEnvase',params,{headers:headers})
      .map(res => res.json());
  }

  getEnvase(IdEnvase){
    return this._http.get(this.url + 'envase/'+IdEnvase).map(res => res.json());
  }

  getEnvases(Habilitado = 1){
    return this._http.get(this.url + 'envases?Habilitado='+Habilitado).map(res => res.json());
  }

  updateEnvase(IdEnvase,Envase){

    let params = JSON.stringify(Envase);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'envase/'+IdEnvase,params,{headers:headers})
      .map(res => res.json());
  }

  deleteEnvase(IdEnvase){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'envase/'+IdEnvase,options)
      .map(res => res.json());
  }

}
