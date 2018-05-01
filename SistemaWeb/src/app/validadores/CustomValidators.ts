import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isString} from 'util';
import {Utilidades} from '../components/Utilidades';

export class CustomValidators {

  static fechaNacimientoTrabajador(c: FormControl) {
    var año = Utilidades.getYearDate(c.value);
    var añoActual = Utilidades.getYearDate(new Date());
    var error = '';

    if( (añoActual - año) <= 18)
      error = 'El trabajador no puede tener menos de 18 años';
    else {
      error = '';
    }

    const message = {
        'fechaNacimientoTrabajador': {
            'message': error
        }
    };

  return error ? message : null;

  }
  static noNumeros(c: FormControl): ValidationErrors {

    const isNumero = isString(String(c.value))
    const message = {
      'noNumeros': {
          'message': 'Solo se permite texto'
      }
    };

    return isNumero ? message : null;
  }

  static espaciosVacios(c:FormControl): ValidationErrors{
    const cadena = String(c.value).trim();

    const message = {
      'espaciosVacios':{
        'message': 'No se permiten espacios vacios'
      }
    };

    return cadena.length == 0 ? message : null;
  }

   static mayorFechaActual (c : FormControl) : ValidationErrors {
      var fecha = c.value;
      var error = '';

       if(Utilidades.formatDateYYYYMMDD(fecha) > Utilidades.formatDateYYYYMMDD(new Date()))
           error ='No puede ser mayor a la fecha Actual'
       else {
           error =''
      }

       const message = {
           'mayorFechaActual':{
               'message': error
           }
       };

       return error ? message : null;
  }


  static telefonos(form : FormGroup) : ValidationErrors {
      const telefono1 = form.get('telefonos.telefonoPrincipal').value.toString().replace("-","");
      const telefono2 = form.get('telefonos.telefonoSecundario').value.toString().replace("-","")
      var error = '';

      if(telefono1 === telefono2) {
        error = 'Los telefonos no pueden ser iguales';
      } else {
        error = '';
      }

      const message = {
          'telefonos':{
              'message': error
          }
      };

    return message;
  }
  static countryCity(form: FormGroup): ValidationErrors {
    const countryControl = form.get('location.country');
    const cityControl = form.get('location.city');

    if (countryControl != null && cityControl != null) {
      const country = countryControl.value;
      const city = cityControl.value;
      let error = null;

      if (country === 'France' && city !== 'Paris') {
        error = 'If the country is France, the city must be Paris';
      }

      const message = {
        'countryCity': {
          'message': error
        }
      };

      return error ? message : null;
    }
  }

  static uniqueName(c: FormControl): Promise<ValidationErrors> {
    const message = {
      'uniqueName': {
        'message': 'The name is not unique'
      }
    };

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(c.value === 'Existing' ? message : null);
      }, 1000);
    });
  }

  static telephoneNumber(c: FormControl): ValidationErrors {
    const isValidPhoneNumber = /^\d{3,3}-\d{3,3}/.test(c.value);
    const message = {
      'telephoneNumber': {
        'message': 'The phone number must be valid (XXX-XXX-XXX, where X is a digit)'
      }
    };
    return isValidPhoneNumber ? null : message;
  }

  static maximoNumeroPermitido(c: FormControl,numeroMax : number) : ValidationErrors {

      return null;
  }

  static telephoneNumbers(form: FormGroup): ValidationErrors {

    const message = {
      'telephoneNumbers': {
        'message': 'At least one telephone number must be entered'
      }
    };

    const phoneNumbers = <FormArray>form.get('phoneNumbers');
    const hasPhoneNumbers = phoneNumbers && Object.keys(phoneNumbers.controls).length > 0;

    return hasPhoneNumbers ? null : message;
  }


  static rangeNumber(min: number, max: number) : ValidatorFn{

      var error = '';
        return (control: AbstractControl): { [key  : string ] : { [key: string]: string  }} | null => {
            if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {

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
