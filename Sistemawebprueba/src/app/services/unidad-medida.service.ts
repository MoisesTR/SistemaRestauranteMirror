import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UnidadMedidaService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  createUnidadMedida(UnidadMedida) : Observable<any> {

    let params = JSON.stringify(UnidadMedida);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'unidadMedida',params,{headers:headers});
  }

  getUnidadMedida(IdUnidadMedida) : Observable<any> {
    return this._http.get(this.url + 'unidadmedida/'+IdUnidadMedida);
  }

  getUnidadesMedida(Habilitado = 1) : Observable<any>{
    return this._http.get(this.url + 'unidadesmedida?Habilitado='+Habilitado);
  }

  updateUnidadMedida(UnidadMedida) : Observable<any> {

      let params = JSON.stringify(UnidadMedida);
      let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url+'unidadmedida/'+UnidadMedida.IdUnidadMedida,params,{headers:headers})
  }

  deleteUnidadMedida(IdUnidadMedida) : Observable<any> {

     let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

     return this._http.request('delete',this.url+'unidadmedida/'+IdUnidadMedida,{headers:headers});
  }

}
