import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TelefonoProveedor} from '@app/models/TelefonoProveedor';

@Injectable()
export class ProveedorService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  createProveedor(Proveedor): Observable<any> {

    const params = JSON.stringify(Proveedor);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'proveedor', params, {headers: headers});
  }

  createTelefonoProveedor(Telefono: TelefonoProveedor): Observable<any> {
    const params = JSON.stringify(Telefono);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'proveedor/telefono', params, { headers: headers});
  }

  getProveedor(IdProveedor): Observable<any> {
    return this._http.get(this.url + 'proveedor/' + IdProveedor);
  }

  getProveedores(Habilitado = 1): Observable<any> {
    if (Habilitado !== null) {
        return this._http.get(this.url + 'proveedores?Habilitado=' + Habilitado);
    } else {
        return this._http.get(this.url + 'proveedores');
    }
  }

  updateProveedor(Proveedor): Observable<any> {

    const params = JSON.stringify(Proveedor);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url + 'proveedor/' + Proveedor.IdProveedor, params, {headers: headers});
  }

  deleteProveedor(IdProveedor): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

      const body = JSON.stringify({'Habilitado': false});

    return this._http.request('delete', this.url + 'proveedor/' + IdProveedor, {headers: headers, body: body});
  }

  deleteTelefonoProveedor(IdTelefono): Observable<any> {

      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'token'
      });

      const body = JSON.stringify({'Habilitado': false});

      return this._http.request('delete', this.url + 'proveedor/telefono/' + IdTelefono, {headers: headers, body: body});
  }

}
