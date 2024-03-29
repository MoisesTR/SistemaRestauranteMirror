import {EventEmitter, Injectable} from '@angular/core';
import {Global} from './global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EmpaqueService {

  public url: string;
  public eventoModal = new EventEmitter<any>();

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  mostrarModal() {
    this.eventoModal.emit(true);
  }

  createEmpaque(Empaque): Observable<any> {

    const params = JSON.stringify(Empaque);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'empaque', params, { headers: headers });
  }

  getEmpaque(IdEmpaque): Observable<any> {
    return this._http.get(this.url + 'empaque/' + IdEmpaque);
  }

  getEmpaques(Habilitado = 1): Observable<any> {
    return this._http.get(this.url + 'empaques?Habilitado=' + Habilitado);
  }

  updateEmpaque(Empaque): Observable<any> {

    const params = JSON.stringify(Empaque);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url + 'empaque/' + Empaque.IdEmpaque, params, { headers: headers });
  }

  deleteEmpaque(IdEmpaque): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    const body = JSON.stringify({'Habilitado': 0});

    return this._http.request('delete', this.url + 'empaque/' + IdEmpaque, { headers: headers, body: body});
  }

}
