import {isArray} from 'util';
import {ServiceRestError} from '../models/ServiceRestError';

export class Utilidades{

  //Metodo para retornar el mensje de error que genera la excepcion en sql
  static mensajeError2(error){
    return error['error'].message ;

  }

  static mensajeError(mensaje){

    if(isArray(mensaje.error)){
        return mensaje.error[0].msg;
    } else {
        return mensaje.error.message;
      // if(mensaje.error.showMessage){
      //     return mensaje.error.message;
      // } else {
      //
      // }
    }

  }

  //Invocacion de metodo para invocar modal y limpieza del formulario invocado
  static invocacionModal(Modal,Formulario){

    Modal.show();
    Formulario.reset();
  }

}
