import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoComaDinero'
})
export class FormatoComaDineroPipe implements PipeTransform {



    public transform(value: any) {

      value = '1000000000.21123123'
      console.log(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));


      return null;
    }

}
