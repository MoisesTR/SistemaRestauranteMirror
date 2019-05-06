import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "formatoComaDinero"
})
export class FormatoComaDineroPipe implements PipeTransform {
	public transform(value: any) {
		const valor = value + "";
		let valorRetornar = "";
		let valorDecimal = "";
		let valorEntero = "";
		let valorFormateado = "";

		if (valor.indexOf(".") !== -1) {
			const cadena = valor.toString().split(".", 2);
			valorEntero = cadena[0];
			valorDecimal = cadena[1];
		}

		valorFormateado = valorEntero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		if (valorDecimal !== "") valorRetornar = valorFormateado + "." + valorDecimal;
		else {
			valorRetornar = valorFormateado;
		}

		return valorRetornar;
	}
}
