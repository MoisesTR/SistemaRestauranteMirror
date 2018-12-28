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

		if (valor !== null && valor !== undefined ) {
			console.log('valor')
			console.log(valor)
            return valor.filter( (item) => {
            	if (item.CodigoProducto !== null) {
                    return item.CodigoProducto.toLowerCase().includes(term.toLowerCase());
				} else {
                    return item.CodigoInterno.toLowerCase().includes(term.toLowerCase());
				}

            });
		}

	}
}
