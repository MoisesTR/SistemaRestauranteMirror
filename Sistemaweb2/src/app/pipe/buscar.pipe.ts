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
		  console.log(item.NombreProducto)
			return item.NombreProducto.toLowerCase().includes(term.toLowerCase());
		});
	}
}
