import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CargoService {
public url: string;
  constructor(
  	private _http: Http
  	) {

  	this.url = Global.url;
   }

     createCargo(Cargo){

    let params = JSON.stringify(Cargo);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'createCargo',params,{headers:headers})
      .map(res => res.json());
  }

  getCargo(IdCargo){
    return this._http.get(this.url + 'cargo/'+IdCargo).map(res => res.json());
  }

  getCargos(){
    return this._http.get(this.url + 'cargos').map(res => res.json());
  }

  updateCargo(IdCargo,Cargo){

    let params = JSON.stringify(Cargo);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'cargo/'+IdCargo,params,{headers:headers})
      .map(res => res.json());
  }

  deleteCargo(IdCargo){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'cargo/'+IdCargo,options)
      .map(res => res.json());
  }


}
