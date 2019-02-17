import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global} from './global';
import {TipoInsumo} from '@app/models/interface/TipoInsumo';
import {map} from 'rxjs/operators';

@Injectable()
export class TipoInsumoService{

    public url: string;

    constructor(private http: HttpClient){
        this.url = Global.url;
    }

    getTiposInsumos(Habilitado = 1): Observable<any>{
        return this.http.get<TipoInsumo[]>(this.url + 'tiposInsumos?Habilitado=' + Habilitado).pipe(
            map(data => data)
        );
    }
}