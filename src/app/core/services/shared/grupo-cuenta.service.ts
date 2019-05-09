import { Injectable } from "@angular/core";
import { RestService } from "@app/core/services/RestService";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class GrupoCuentaService extends RestService {
	private relativeUrl: string = "grupos";

	constructor(public http: HttpClient) {
		super(http);
	}

}
