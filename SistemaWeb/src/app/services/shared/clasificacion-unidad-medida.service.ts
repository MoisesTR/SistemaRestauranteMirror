import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ClasificacionUnidadMedidaService {

  public url: string;

  constructor( private _http: HttpClient) {
    this.url = Global.url;
  }

  createClasficacionUnidadMedida(ClasificacionUnidadMedida): Observable<any> {

    const params = JSON.stringify(ClasificacionUnidadMedida);
    const headers = new HttpHeaders({'Content-Type': ''});

    return this._http.post(this.url + 'createClasificacion', params, { headers: headers });
  }

  getClasificacionUnidadesMedida(Habilitado = 1): Observable<any> {
    return this._http.get(this.url + 'clasificacionesunidadmedida?Habilitado=' + Habilitado );
  }


}
