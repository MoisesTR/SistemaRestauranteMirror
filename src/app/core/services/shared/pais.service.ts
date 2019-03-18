import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Global } from "./global";
import { Pais } from "@app/models/Pais";

@Injectable()
export class PaisService {
	public url: string;

	constructor(private http: HttpClient) {
		this.url = Global.url;
	}

	getPais(IdPais) {
		return this.http.get<Pais>(this.url + "pais/" + IdPais).pipe(data => data);
	}

	getPaises(Habilitado = 1): Observable<any> {
		return this.http.get<Pais[]>(this.url + "paises?Habilitado=" + Habilitado).pipe(data => data);
	}
}
