import {Injectable} from '@angular/core';
import {Global} from './global';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FacturaService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  getFacturas() : Observable<any>{
    return this._http.get(this.url + 'facturas/')
  }

}
