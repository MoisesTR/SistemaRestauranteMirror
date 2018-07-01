import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from './global';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MenuService{

    public url : string;

    constructor(private _http : HttpClient){
        this.url = Global.url;
    }

    getMenuesByIdRol(IdRol) : Observable<any> {
        return this._http.get(this.url + 'menu/' + IdRol);
    }
}