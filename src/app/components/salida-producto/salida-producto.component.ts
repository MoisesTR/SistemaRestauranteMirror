import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '@app/validadores/CustomValidators';

declare var $:any

@Component({
  selector: 'app-salida-producto',
  templateUrl: './salida-producto.component.html',
  styleUrls: ['./salida-producto.component.css']
})
export class SalidaProductoComponent implements OnInit {

  public formSalida : FormGroup;

  constructor(
    private formBuilderSalida : FormBuilder
  ) {


  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.formSalida = this.formBuilderSalida.group(
      {
        'nombreProducto' : new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ])
        , 'cantidaProducto' : new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ])
        , 'fechaSalida' : new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ])
        , 'horaSalida' : new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ])
        , 'motivo' : new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ])
      }
    )
  }

  createSalida(){

  }

}
