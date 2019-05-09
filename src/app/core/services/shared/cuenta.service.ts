import { Injectable } from "@angular/core";
import { RestService } from "@app/core/services/RestService";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Cuenta } from "@app/models/Cuenta";

@Injectable()
export class CuentaService extends RestService {
	private relativeUrl: string = "cuentas";

	constructor(public http: HttpClient) {
		super(http);
	}

	public getCuentas(): Observable<Cuenta[]> {
		return this.get(this.relativeUrl);
	}

	public createCuenta(data: any): Observable<any> {
		return this.post(this.relativeUrl, data);
	}
}
