import { Injectable } from "@angular/core";
import { Global } from "./global";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class FacturaService {
	public url: string;

	constructor(private _http: HttpClient) {
		this.url = Global.url;
	}

	getFacturaById(idFactura: number): Observable<any> {
		return this._http.get(this.url + "getFactura?IdFactura=" + idFactura);
	}

	getCambiosFacturaById(idFactura: number): Observable<any> {
		return this._http.get(this.url + "getCambiosFactura?IdFactura=" + idFactura);
	}

	getFacturas(
		IdFechaFiltro = null,
		Habilitado = true,
		FechaInicio = null,
		FechaFin = null,
		IdProveedor,
		IdEstadoFactura,
		CodFactura
	): Observable<any> {
		const params = new HttpParams()
			.set("IdFechaFiltro", IdFechaFiltro)
			.set("FechaInicio", FechaInicio)
			.set("FechaFin", FechaFin)
			.set("IdProveedor", IdProveedor)
			.set("IdEstadoFactura", IdEstadoFactura)
			.set("CodFactura", CodFactura);
		return this._http.get(this.url + "listarfacturas?Habilitado=" + Habilitado, { params: params });
	}

	getFacturasIngresadas(): Observable<any> {
		return this._http.get(this.url + "getFacturas");
	}

	createFactura(Factura): Observable<any> {
		const params = JSON.stringify(Factura);
		const headers = new HttpHeaders({ "Content-type": "application/json" });

		return this._http.post(this.url + "factComp/", params, { headers: headers });
	}
	createDetailFactura(FacturaDetalle): Observable<any> {
		const params = JSON.stringify(FacturaDetalle);
		const headers = new HttpHeaders({ "Content-type": "application/json" });

		return this._http.post(this.url + "detalleFactComp/", params, { headers: headers });
	}

    getTop5ProductosMasCompradosFacturas(): Observable<any> {
        return this._http.get(this.url + 'top5Productos/');
    }

	updateDetailFactura(FacturaDetalle): Observable<any> {
		const params = JSON.stringify(FacturaDetalle);
		const headers = new HttpHeaders({ "Content-type": "application/json" });

		return this._http.post(this.url + "detalleFactComp/", params, { headers: headers });
	}

	updateFactura(Factura): Observable<any> {
		const params = JSON.stringify(Factura);
		const headers = new HttpHeaders({ "Content-type": "application/json" });

		return this._http.post(this.url + "updateFactComp/", params, { headers: headers });
	}
}
