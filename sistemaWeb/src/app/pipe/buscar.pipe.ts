import { Injectable, Pipe, PipeTransform} from '@angular/core';
@Pipe({

	name: 'buscar'
})

@Injectable()
export class BuscarPipe implements PipeTransform{
	transform(valor:any, term:any):any{
		if(term === undefined){
			return valor;
		}	
 
		return valor.filter( function(){

			return valor.name.toLowerCase().include(term.toLowerCase());
		});
	}
}
