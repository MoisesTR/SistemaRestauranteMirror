import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global} from './global';

@Injectable()
export class TipoDocumentoService{

    public url: string;

    constructor(private _http: HttpClient){
        this.url = Global.url;
    }

    createTipoDocumento(TipoDocumento): Observable<any>{
        const params = JSON.stringify(TipoDocumento);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'token'
        });

        return this._http.post(this.url + 'tipoDocumento' + params, {headers: headers});
    }
    
    getTipoDocumento(IdTipoDocumento): Observable<any>{
        return this._http.get(this.url + 'tipoDocumento/' +IdTipoDocumento);
    }

    getTiposDocumentos(Habilitado = 1 ): Observable<any>{
        return this._http.get(this.url + 'tipoDocumento?Habilitado=' + Habilitado);
    }

    updateTipoDocumento(TipoDocumento): Observable<any>{
        const params = JSON.stringify(TipoDocumento);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'token'
        });

        return this._http.put(this.url + 'tipoDocumento/' + TipoDocumento.IdTipoDocumento, params, {headers: headers});
    }

    deletTipoDocumento(IdTipoDocumento): Observable<any>{
        const body = JSON.stringify({'Habilitado':false});
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'token'
        });

        return this._http.request('delete', this.url + 'tipoDocumento/' + IdTipoDocumento, {headers:headers, body:body});
    }
}