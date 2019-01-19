import { Pipe, PipeTransform } from "@angular/core";
import { Global } from "@app/core/services/shared/global";
import { NGXLogger } from "ngx-logger";

@Pipe({
	name: "imagen"
})
export class ImagenPipe implements PipeTransform {
	constructor(public logger: NGXLogger) {}
	transform(img: string, tipo: string = "temp"): any {
		const url = Global.url + "getImagen";

		if (!img) {
			return url + "/temp/nada";
		}

		switch (tipo) {
			case "producto":
				return url + "/productos/" + img;
			case "trabajadores":
				return url + "/trabajadores/" + img;
			case "reportes":
				return url + "/reportes/" + img;
			case "temp":
				return url + "/temp/" + img;
			default:
				this.logger.info("El tipo de imagen no existe!");
				return url + "/temp/nada";
		}
	}
}
