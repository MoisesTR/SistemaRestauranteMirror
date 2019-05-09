import { Injectable } from "@angular/core";
import { RestService } from "@app/core/services/RestService";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BodegaAreaProduccion } from "@app/models/BodegaAreaProduccion";

@Injectable({
	providedIn: "root"
})
export class BodegaAreaProduccionService extends RestService {
	private relativeUrl: string = "bodegaAreaProduccion";

	constructor(public http: HttpClient) {
		super(http);
	}

	getBodegasAreaProduccion(): Observable<BodegaAreaProduccion[]> {
		return this.get(this.relativeUrl);
	}
}
