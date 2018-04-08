import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CargoService {

  public url: string;

  constructor(private _http: HttpClient) {
  	this.url = Global.url;
   }

  createCargo(Cargo): Observable<any>{

    let params = JSON.stringify(Cargo);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'cargo',params,{headers:headers});
  }

  getCargo(IdCargo): Observable<any>{
    return this._http.get(this.url + 'cargo'+IdCargo)
  }

  getCargos(Habilitado = 1) : Observable<any>{
    return this._http.get(this.url + 'cargos?Habilitado='+Habilitado);
  }

  updateCargo(Cargo): Observable<any>{

    let params = JSON.stringify(Cargo);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'cargo',params,{headers:headers})
  }

  deleteCargo(IdCargo) : Observable<any>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let body = JSON.stringify({"Habilitado": 0});

    return this._http.request('delete',this.url+'cargo/'+IdCargo,{headers:headers,body:body})
  }

}
