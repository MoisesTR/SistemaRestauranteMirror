import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CambioDolarService{

    public url:string;
    
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    getCambioDolar(CambioDolar): Observable<any>{
        return this._http.get(this.url,+ 'cambiodolar/'+ CambioDolar);
    }
    
}