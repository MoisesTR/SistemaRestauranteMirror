import { Injectable } from "@angular/core";
import { RestService } from "@app/core/services/RestService";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AreaProduccion } from "@app/models/AreaProduccion";

@Injectable({
	providedIn: "root"
})
export class AreaProduccionService extends RestService {
	private relativeUrl: string = "areasProduccion";

	constructor(public http: HttpClient) {
		super(http);
	}

	getAreaProduccion(id: number): Observable<AreaProduccion> {
		return this.get(this.relativeUrl + "/" + id);
	}
}
