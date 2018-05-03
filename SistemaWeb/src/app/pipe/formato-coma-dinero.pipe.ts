import { Pipe, PipeTransform } from '@angular/core';
import {isArray} from 'util';

@Pipe({
  name: 'formatoComaDinero'
})
export class FormatoComaDineroPipe implements PipeTransform {

    public transform(value: any) {
        var valor = value + "";
        var valorRetornar = '';
        var valorDecimal = '';
        var valorEntero = '';
        var valorFormateado = '';

        if(valor.indexOf(".")!= -1) {
            var cadena = valor.toString().split(".",2);
            valorEntero = cadena[0];
            valorDecimal = cadena[1];
        }

        valorFormateado = valorEntero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if(valorDecimal != '')
            valorRetornar = valorFormateado + '.' + valorDecimal;
        else {
            valorRetornar = valorFormateado;
        }

        return valorRetornar;
    }

}
