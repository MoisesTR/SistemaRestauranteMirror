import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TrabajadorService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  createTrabajador(Trabajador): Observable<any> {

    const params = JSON.stringify(Trabajador);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'trabajador', params, { headers: headers});
  }

  getTrabajador(IdTrabajador): Observable<any> {
      return this._http.get(this.url + 'trabajador/' + IdTrabajador);
  }

  getTrabajadores(Habilitado = 1): Observable<any> {
    return this._http.get(this.url + 'trabajadores?Habilitado=' + Habilitado);
  }

  getTiposDocumento(Habilitado = 1): Observable<any> {
    return this._http.get(this.url + 'tiposDocumento?Habilitado=' + Habilitado);
  }

  updateTrabajador(Trabajador): Observable<any> {

    const params = JSON.stringify(Trabajador);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url + 'trabajador/' + Trabajador.IdTrabajador, params, { headers: headers });
  }


  deleteTrabajador(IdTrabajador): Observable<any> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'token'
      });

      const body = JSON.stringify({ 'Habilitado': false});

      return this._http.request('delete', this.url + 'trabajador/' + IdTrabajador, {headers: headers, body: body});
  }

}
