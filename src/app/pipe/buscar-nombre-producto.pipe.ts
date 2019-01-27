import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'buscarProductoxNombre'
})

@Injectable()
export class BuscarProductoNombrePipe implements PipeTransform {

	transform(valor: any, term: string): any {
		if (term === undefined) {
			return valor;
		}

		if (valor !== null && valor !== undefined) {
            return valor.filter( (item) => {
                return item.NombProducto.toLowerCase().includes(term.toLowerCase());
            });
		}

	}
}
