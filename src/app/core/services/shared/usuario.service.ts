import { Injectable } from "@angular/core";
import { Global } from "./global";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UsuarioService {
	public url: string;
	public identity;
	public token;

	constructor(private _http: HttpClient) {
		this.url = Global.url;
	}

	login(usuario, gettoken = true): Observable<any> {
		usuario.gettoken = gettoken;

		const params = JSON.stringify(usuario);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this._http.post(this.url + "signin", params, { headers: headers });
	}

	login2(usuarioLogin, gettoken = null): Observable<any> {
		if (gettoken != null) {
			usuarioLogin.gettoken = gettoken;
		}

		const params = JSON.stringify(usuarioLogin);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this._http.post(this.url + "signin", params, { headers: headers });
	}

	getIdentity() {
		const identity = JSON.parse(localStorage.getItem("identity"));

		if (identity !== "undefined") {
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}

	createUsuario(Usuario): Observable<any> {
		const params = JSON.stringify(Usuario);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this._http.post(this.url + "signup", params, { headers: headers });
	}

	getUsuarios(Habilitado = 1): Observable<any> {
		return this._http.get(this.url + "users?Habilitado=" + Habilitado);
	}

	getInfoUsuario(): Observable<any> {
		return this._http.get(this.url + "me?addOtherUInfo=" + true);
	}

	deleteUsuario(IdUsuario): Observable<any> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: "token"
		});

		const body = JSON.stringify({ Habilitado: 0 });

		return this._http.request("delete", this.url + "user/" + IdUsuario, { headers: headers, body: body });
	}
}
