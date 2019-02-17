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
            return valor.filter( (item) => {
            	if (item.CodOriginal !== null) {
                    return item.CodOriginal.toLowerCase().includes(term.toLowerCase());
				} else {
                    return item.CodProd.toLowerCase().includes(term.toLowerCase());
				}

            });
		}
	}
}
