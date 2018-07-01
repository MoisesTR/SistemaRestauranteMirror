import {Injectable} from '@angular/core';
import {Global} from './global';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class FacturaService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  getFacturas() : Observable<any>{
    return this._http.get(this.url + 'listarfacturas/')
  }

  createFactura(Factura) : Observable<any>{
    let params = JSON.stringify(Factura);
    let headers = new HttpHeaders({'Content-type':'application/json'});

    return this._http.post(this.url + 'factComp/',params,{headers:headers})
  }

  createDetailFactura(FacturaDetalle) : Observable<any> {
      let params = JSON.stringify(FacturaDetalle);
      let headers = new HttpHeaders({'Content-type':'application/json'});

      return this._http.post(this.url + 'detalleFactComp/',params,{headers:headers});
  }
}
