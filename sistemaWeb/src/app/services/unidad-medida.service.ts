import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnidadMedidaService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createUnidadMedida(UnidadMedida){

    let params = JSON.stringify(UnidadMedida);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'unidadMedida',params,{headers:headers})
      .map(res => res.json());

  }

  getUnidadMedida(IdUnidadMedida){

     return this._http.get(this.url + 'unidadmedida/'+IdUnidadMedida).map(res => res.json());
  }


  getUnidadesMedida(Habilitado = 1){
    return this._http.get(this.url + 'unidadesmedida?Habilitado='+Habilitado).map(res => res.json());
  }

  updateUnidadMedida(IdUnidadMedida,UnidadMedida){

      let params = JSON.stringify(UnidadMedida);
      let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'unidadmedida/'+IdUnidadMedida,params,{headers:headers})
      .map(res => res.json());


  }

  deleteUnidadMedida(IdUnidadMedida){

     let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'unidadmedida/'+IdUnidadMedida,options)
      .map(res => res.json());

  }

}
