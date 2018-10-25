import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RolusuarioService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  createRolUsuario(RolUsuario): Observable<any> {
    const params = JSON.stringify(RolUsuario);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'rol', params, { headers: headers});
  }

  getRolUsuario(IdRolUsuario): Observable<any> {
    return this._http.get(this.url + 'rol/', IdRolUsuario);
  }

  getRoles(): Observable<any> {
    return this._http.get(this.url + 'roles');
  }

  updateRol(RolUsuario): Observable<any> {

    const params = JSON.stringify(RolUsuario);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'token'});

    return this._http.put(this.url + 'rol/' + RolUsuario.IdRol, params, { headers: headers });
  }

  deleteRol(IdRol): Observable<any> {
    const headers =  new HttpHeaders({
      'Content-Type' : 'application/json'
      , 'Authorization': 'token'
    });

    return this._http.request('delete', this.url + 'rol/' + IdRol, { headers: headers});
  }

}
