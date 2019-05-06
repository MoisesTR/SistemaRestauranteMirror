import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "buscarProveedor"
})
@Injectable()
export class BuscarProveedorPipe implements PipeTransform {
	transform(valor: any, term: string): any {
		if (term === undefined) {
			return valor;
		}

		if (valor) {
			return valor.filter(item => {
				return item.NombProveedor.toLowerCase().includes(term.toLowerCase());
			});
		}
	}
}
