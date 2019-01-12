import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class TipoInsumoService{

    public url:string

    constructor(private _http: HttpClient){
       this.url = Global.url;
    }

    createTipoInsumo(TipoInsumo): Observable<any>{
        const params = JSON.stringify(TipoInsumo);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this._http.post(this.url + 'tipoinsumo',params,{headers:headers});
    }

    getTipoInsumo(IdTipoInsumo): Observable<any>{
        return this._http.get(this.url + 'tipoinsumo/' + IdTipoInsumo);
    }

    gettIposInsumos(Habilitado = 1): Observable<any>{
        return this._http.get(this.url + 'tipoinsumo?Habilitado' + Habilitado);
    }

    updateTipoInsumo(TipoInsumo): Observable<any>{
        const params = JSON.stringify(TipoInsumo);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'token'
        });
        
        return this._http.put(this.url + 'tipoinsumo/'+ TipoInsumo.IdTipoInsumo, params, { headers: headers});
    }

    deleteTipoInsumo(IdTipoInsumo): Observable<any>{
        const body = JSON.stringify({ 'Habilitado': 0})
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': 'token'
        });

        return this._http.request('delete', this.url + 'tipoinsumo/' + IdTipoInsumo, {headers: headers, body: body});
    }
}