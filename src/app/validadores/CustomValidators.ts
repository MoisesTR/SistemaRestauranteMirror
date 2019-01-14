import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isNull} from 'util';
import {Utils} from '../components/Utils';

export class CustomValidators {

  static fechaNacimientoTrabajador(c: FormControl) {
      const año = Utils.getYearDate(c.value);
      const añoActual = Utils.getYearDate(new Date());
      let error = '';

    if ( (añoActual - año) <= 18) {
        error = 'El trabajador no puede tener menos de 18 años';
    } else {
        error = '';
    }
    const message = {
        'fechaNacimientoTrabajador': {
            'message': error
        }
    };

  return error ? message : null;

  }

  static espaciosVacios(c: FormControl): ValidationErrors {
    const cadena = String(c.value).trim();

    const message = {
      'espaciosVacios': {
        'message': 'No se permiten espacios vacios'
      }
    };

    return cadena.length === 0 ? message : null;
  }

  static nospaceValidator(control: AbstractControl): { [s: string]: boolean } {
        if (control.value && control.value.toString().trim().length === 0) {
            return { nospace: true };
        }
  }

   static mayorFechaActual (c: FormControl): ValidationErrors {
      const fecha = c.value;
      let error = '';

      if ( fecha && Utils.formatDateYYYYMMDD(fecha) > Utils.formatDateYYYYMMDD(new Date())) {
           error = 'No puede ser mayor a la fecha Actual';
       } else {
           error = '';
      }

       const message = {
           'mayorFechaActual': {
               'message': error
           }
       };

       return error ? message : null;
  }

  static rangeNumber(min: number, max: number) : ValidatorFn{

      var error = '';
        return (control: AbstractControl): { [key  : string ] : { [key: string]: string  }} | null => {
            if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {

                if(!isNull(control.value))
                    error = 'Fuera de rango, el rango de numeros permitidos es ['+min+' - ' + max + ']';
            } else {
                error = '';
            }

            const message = {
                'rango': {
                    'message': error
                }
            };

            return error == '' ? null : message;
        };
    }

}
