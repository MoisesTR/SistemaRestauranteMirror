import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EstadoProductoService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  getEstadosProducto() : Observable<any> {
    return this._http.get(this.url + 'estadosproductos/');
  }

}
