import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "buscar"
})
@Injectable()
export class BuscarPipe implements PipeTransform {
	transform(valor: any, term: string, codigoFiltrar: number): any {
		if (!term) {
			return valor;
		}
		if (valor) {
		    // CODIGO PRODUCTO
		    if (codigoFiltrar === 1) {
                return valor.filter(item => {
                    if (item.CodProd !== null) {
                        return item.CodProd.toLowerCase().includes(term.toLowerCase());
                    } else {
                        return item.CodOriginal.toLowerCase().includes(term.toLowerCase());
                    }
                });
            } else {
                return valor.filter(item => {
                    if (item.CodOriginal !== null) {
                        return item.CodOriginal.toLowerCase().includes(term.toLowerCase());
                    } else {
                        return item.CodProd.toLowerCase().includes(term.toLowerCase());
                    }
                });
            }
		}
	}
}
