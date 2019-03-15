import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Global } from "./global";

@Injectable()
export class FacturacionMonedaService {
	public url: string;

	constructor(private _http: HttpClient) {
		this.url = Global.url;
	}

	getFacturaMoneda(IdPais): Observable<any> {
		return this._http.get(this.url + "monedas/" + IdPais);
	}

	getFacturaMonedas(Habilitado = 1): Observable<any> {
		return this._http.get(this.url + "monedas?Habilitado=" + Habilitado);
	}
}
