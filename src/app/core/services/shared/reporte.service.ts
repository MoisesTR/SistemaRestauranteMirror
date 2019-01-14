import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = 'http://localhost:3000/reports';
  }

  getReporte(idReporte, preview, catalogoApi): Observable<any> {
      const params = new HttpParams().set('shortid', idReporte)
          .set('preview', preview)
          .set('catalogoApi', catalogoApi);
      return this._http.get(this.url, {params: params} );
  }

}
