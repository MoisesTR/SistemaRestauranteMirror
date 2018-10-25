import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class EnvaseService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  createEnvase(Envase): Observable<any> {

    const params = JSON.stringify(Envase);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'envase', params, { headers: headers });
  }

  getEnvase(IdEnvase): Observable<any> {
    return this._http.get(this.url + 'envase/' + IdEnvase);
  }

  getEnvases(Habilitado = 1): Observable<any> {
    return this._http.get(this.url + 'envases?Habilitado=' + Habilitado);
  }

  updateEnvase(Envase): Observable<any> {

    const params = JSON.stringify(Envase);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url + 'envase/' + Envase.IdEnvase, params, { headers: headers });
  }

  deleteEnvase(IdEnvase): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });
    const body = JSON.stringify({'Habilitado': false});

    return this._http.request('delete', this.url + 'envase/' + IdEnvase, {headers: headers, body: body});
  }

}
