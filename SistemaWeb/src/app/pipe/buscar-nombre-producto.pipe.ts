import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'buscarProductoxNombre'
})

@Injectable()
export class BuscarProductoNombre implements PipeTransform {

	transform(valor: any, term: string): any {
		if (term === undefined) {
			return valor;
		}

		if (valor !== null && valor !== undefined) {
            return valor.filter( (item) => {
                return item.NombreProducto.toLowerCase().includes(term.toLowerCase());
            });
		}

	}
}
