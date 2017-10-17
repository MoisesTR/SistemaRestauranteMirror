import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class EmpaqueService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createEmpaque(){

  }

  getEmpaque(){

  }

  getEmpaques(){

  }

  updateEmpaque(){

  }

  deleteEmpaque(){

  }

}
