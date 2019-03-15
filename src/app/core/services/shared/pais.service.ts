import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Global } from "./global";

@Injectable()
export class PaisService {
	public url: string;

	constructor(private _http: HttpClient) {
		this.url = Global.url;
	}

	getPais(IdPais): Observable<any> {
		return this._http.get(this.url + "pais/" + IdPais);
	}

	getPaises(Habilitado = 1): Observable<any> {
		return this._http.get(this.url + "paises?Habilitado=" + Habilitado);
	}
}
