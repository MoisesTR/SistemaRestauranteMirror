import {AbstractControl, AbstractControlDirective} from '@angular/forms';

export class MensajesError {
    private static readonly errorMessages = {
        'required': () => 'Este campo es requerido  ',
        'minlength': (params) => 'El numero minimo permitido de caracteres es ' + params.requiredLength,
        'maxlength': (params) => 'El numero maximo permitido de caracteres es ' + params.requiredLength,
        /* 'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,*/
        'pattern': (params) => 'El correo no es valido!',
        'uniqueName': (params) => params.message,
        'telephoneNumbers': (params) => params.message,
        'telephoneNumber': (params) => params.message,
        'noNumeros': (params) => params.message,
        'espaciosVacios': (params) => params.message,
        'mayorFechaActual': (params) => params.message,
        'fechaNacimientoTrabajador' : (params) => params.message,
        'telefonos' : (params) => params.message,
        'rango' : (params) => params.message
    };

    private control: AbstractControlDirective | AbstractControl;
    public setControl(control: AbstractControlDirective | AbstractControl) {
        this.control = control;
    }
    shouldShowErrors(): boolean {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        if (this.shouldShowErrors()) {
            return Object.keys(this.control.errors)
                .map(field => this.getMessage(field, this.control.errors[field]));
        } else {
            return null;
        }
    }

    public getMessage(type: string, params: any) {
        return MensajesError.errorMessages[type](params);
    }
}
