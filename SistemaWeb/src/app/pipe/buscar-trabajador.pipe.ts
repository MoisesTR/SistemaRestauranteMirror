import { Injectable, Pipe, PipeTransform} from '@angular/core';
import {isNull, isUndefined} from 'util';
@Pipe({

    name: 'buscarTrabajador'
})

@Injectable()
export class BuscarTrabajadorPipe implements PipeTransform{

    transform(valor:any, term:string):any{
        if(term === undefined){
            return valor;
        }

        if(!isNull(valor) && !isUndefined(valor)) {
            return valor.filter( (item) => {
                return item.Nombres.toLowerCase().includes(term.toLowerCase());
            });
        }

    }
}
