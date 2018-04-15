import {isArray, isUndefined} from 'util';


export class Utilidades{

  //Metodo para retornar el mensje de error que genera la excepcion en sql
  static mensajeError2(error){
    return error['error'].message ;

  }

  static mensajeError(mensaje){
    if(isUndefined(mensaje)){

    } else {
        if(isArray(mensaje.error)){
            return mensaje.error[0].msg;
        } else {
            return mensaje.error.message;
            // if(mensaje.error.showMessage){
            //     return mensaje.error.message;
            // } else {
            //    return 'Ha ocurrido un error'
            // }
        }
    }

  }

  //Invocacion de metodo para invocar modal y limpieza del formulario invocado
  static invocacionModal(Modal,Formulario){

    Modal.show();
    Formulario.reset();
  }

}
