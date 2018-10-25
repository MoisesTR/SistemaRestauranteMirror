import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DeleteImageService {

    public url: string;

    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    deleteImage(tipo: string, img: string): Observable<any> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'token'
        });

        return this._http.request('delete', this.url + 'deleteImage/' + tipo + '/' + img, { headers: headers});
    }


}
