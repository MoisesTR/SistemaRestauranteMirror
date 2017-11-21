import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ClasificacionUnidadMedidaService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }


  createClasficacionUnidadMedida(ClasificacionUnidadMedida){

    let params = JSON.stringify(ClasificacionUnidadMedida);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'createClasificacion',params,{headers:headers})
      .map(res => res.json());


  }

  getClasificacionUnidadMedida(){
    /*return this._http.get(this.url+'createClasificacion',params,{headers:headers})
      .map(res => res.json());*/
  }

  getClasificacionUnidadesMedida(){

  }

  updateClasificacionUnidadMedida(){

  }

  deleteClasificacionUnidadMedida(){

  }

}
