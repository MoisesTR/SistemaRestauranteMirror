import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global} from './global';

@Injectable()
export class TipoMonedaService{

    public url: string;

    constructor(private _http: HttpClient){
        this.url = Global.url;
    }

    getTipoMoneda(IdTipoMoneda): Observable<any>{
        return this._http.get(this.url + 'tipoMoneda/' + IdTipoMoneda);
    }

    getTiposMonedas(Habilitado = 1): Observable<any>{
        return this._http.get(this.url + 'tipoMoneda?Habilitado=' + Habilitado);
    }
}