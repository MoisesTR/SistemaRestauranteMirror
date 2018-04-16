import {isArray, isUndefined} from 'util';
declare var $:any;
import swal from 'sweetalert2';

export class Utilidades{

  //Metodo para retornar el mensje de error que genera la excepcion en sql
  static mensajeError2(error){
    return error['error'].message ;

  }

  static mensajeError(mensaje){
    if(isUndefined(mensaje)){
        return 'El error esta indefinido';
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

  static showMsgInfo(mensaje: string){
      swal(
          'Informacion',
          mensaje,
          'info'
      )
  }

  static showMsgError(mensaje : string){
     swal(
         'Error',
         mensaje,
         'error'
     )
  }

  static showMsgSucces(mensaje : string) {
      swal(
          'Exitoso',
          mensaje,
          'success'
      )
  }
}
