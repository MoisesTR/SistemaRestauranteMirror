import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Global } from "./global";
import { map } from "rxjs/operators";
import { FacturacionMoneda } from "@app/models/FacturacionMoneda";

@Injectable()
export class FacturacionMonedaService {
	public url: string;

	constructor(private http: HttpClient) {
		this.url = Global.url;
	}

	getFacturaMoneda(IdMoneda) {
		return this.http.get<FacturacionMoneda>(this.url + "monedas/" + IdMoneda).pipe(map(data => data));
	}

	getFacturaMonedas() {
		return this.http.get<FacturacionMoneda[]>(this.url + "monedas").pipe(map(data => data));
	}
}
