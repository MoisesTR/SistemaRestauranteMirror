import { Injectable, Pipe, PipeTransform} from '@angular/core';
import {isNull, isUndefined} from 'util';
@Pipe({

    name: 'buscarProveedor'
})

@Injectable()
export class BuscarProveedorPipe implements PipeTransform{

    transform(valor:any, term:string):any{
        if(term === undefined){
            return valor;
        }

        if(!isNull(valor) && !isUndefined(valor)) {
            return valor.filter( (item) => {
                return item.NombreProveedor.toLowerCase().includes(term.toLowerCase());
            });
        }

    }
}
