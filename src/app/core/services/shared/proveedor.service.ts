import { Injectable } from "@angular/core";
import { Global } from "./global";
import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { TelefonoProveedor } from "../../../models/TelefonoProveedor";
import { Utils } from "@app/components/Utils";
import {Proveedor} from '@app/models/Proveedor';

@Injectable()
export class ProveedorService {
	public url: string;

	constructor(private _http: HttpClient) {
		this.url = Global.url;
	}

	createProveedor(proveedor): Observable<any> {
		const params = JSON.stringify(proveedor);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this._http.post(this.url + "proveedor", params, { headers: headers });
	}

	createTelefonoProveedor(telefono: TelefonoProveedor): Observable<any> {
		const params = JSON.stringify(telefono);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this._http.post(this.url + "proveedor/telefono", params, { headers: headers });
	}

	getProveedor(idProveedor): Observable<any> {
		return this._http.get(this.url + "proveedor/" + idProveedor);
	}

	getProveedores(habilitado = 1): Observable<any> {
		if (habilitado !== null) {
			return this._http.get(this.url + "proveedores?Habilitado=" + habilitado);
		} else {
			return this._http.get(this.url + "proveedores");
		}
	}

	updateProveedor(proveedor): Observable<any> {
		const params = JSON.stringify(Proveedor);
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: "token"
		});

		return this._http.put(this.url + "proveedor/" + proveedor.IdProveedor, params, { headers: headers });
	}

	deleteProveedor(idProveedor): Observable<any> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: "token"
		});

		const body = JSON.stringify({ Habilitado: false });

		return this._http.request("delete", this.url + "proveedor/" + idProveedor, { headers: headers, body: body });
	}

	deleteTelefonoProveedor(IdTelefono): Observable<any> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: "token"
		});

		const body = JSON.stringify({ Habilitado: false });

		return this._http.request("delete", this.url + "proveedor/telefono/" + IdTelefono, { headers: headers, body: body });
	}

	validarTelefonos(contactos: TelefonoProveedor[], isMercado: boolean) {
		if (contactos.length === 0 && !isMercado) {
			Utils.showMsgInfo("Es requerido al menos un contacto de telefono!");
			return false;
		}
		return true;
	}

	validarDatosGuardarProveedor(proveedor: Proveedor) {

	    if (proveedor.IsMercado) {
	        proveedor.IdTipDoc = undefined;
	        proveedor.Direccion = undefined;
        }
    }
}
