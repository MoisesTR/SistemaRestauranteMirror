import { Injectable, Pipe, PipeTransform} from '@angular/core';
@Pipe({

	name: 'buscar'
})

@Injectable()
export class BuscarPipe implements PipeTransform{

	transform(valor:any, term:string):any{
		if(term === undefined){
			return valor;
		}

		return valor.filter( function(item){
			return item.NombreProducto.toLowerCase().includes(term.toLowerCase());
		});
	}
}
