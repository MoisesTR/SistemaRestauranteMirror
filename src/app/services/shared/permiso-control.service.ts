import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Global} from './global';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class PermisoControlService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getPermisosControl(IdRol, Modulo): Observable<any> {
    return this._http.get(this.url + 'permisosControl/' + IdRol + '/' + Modulo);
  }

}
