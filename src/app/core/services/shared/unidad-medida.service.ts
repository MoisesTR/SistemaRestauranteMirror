import { EventEmitter, Injectable } from "@angular/core";
import { Global } from "./global";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UnidadMedidaService {
	public url: string;
	public eventoModal = new EventEmitter<any>();
	constructor(private _http: HttpClient) {
		this.url = Global.url;
	}

	mostrarModal() {
		this.eventoModal.emit(true);
	}

	createUnidadMedida(UnidadMedida): Observable<any> {
		const params = JSON.stringify(UnidadMedida);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this._http.post(this.url + "unidadMedida", params, {
			headers: headers
		});
	}

	getUnidadMedida(IdUnidadMedida): Observable<any> {
		return this._http.get(this.url + "unidadmedida/" + IdUnidadMedida);
	}

	getUnidadesMedida(Habilitado = 1): Observable<any> {
		return this._http.get(this.url + "unidadesmedida?Habilitado=" + Habilitado);
	}

	updateUnidadMedida(UnidadMedida): Observable<any> {
		const params = JSON.stringify(UnidadMedida);
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: "token"
		});

		return this._http.put(
			this.url + "unidadmedida/" + UnidadMedida.IdUnidadMedida,
			params,
			{ headers: headers }
		);
	}

	deleteUnidadMedida(IdUnidadMedida): Observable<any> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: "token"
		});
		const body = JSON.stringify({ Habilitado: false });

		return this._http.request(
			"delete",
			this.url + "unidadmedida/" + IdUnidadMedida,
			{ headers: headers, body: body }
		);
	}
}
