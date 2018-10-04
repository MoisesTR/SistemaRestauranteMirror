import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'buscar'
})

@Injectable()
export class BuscarPipe implements PipeTransform {

	transform(valor: any, term: string): any {
		if (term === undefined) {
			return valor;
		}

		if (valor !== null && valor !== undefined) {
            return valor.filter( (item) => {
                return item.CodigoProducto.toLowerCase().includes(term.toLowerCase());
            });
		}

	}
}
