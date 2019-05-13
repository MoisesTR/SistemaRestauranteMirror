import { Pipe, PipeTransform } from "@angular/core";
import { TipoDescuentoEnum } from "@app/Enums/TipoDescuentoEnum";

@Pipe({
	name: "tipoDescuento"
})
export class TipoDescuentoPipe implements PipeTransform {
	public transform(value: number) {
		if (!value) return "";

		if (value === TipoDescuentoEnum.DescuentoPorcentualPorItem || value === TipoDescuentoEnum.DescuentoPorcentualSobreTransaccion) {
			return " %";
		}

		if (
			value === TipoDescuentoEnum.DescuentoMonetarioPorItem ||
			value === TipoDescuentoEnum.DescuentoMonetarioSobreTransaccion ||
			value === TipoDescuentoEnum.SinDescuentoAplicado
		) {
			return " C$";
		}
	}
}
