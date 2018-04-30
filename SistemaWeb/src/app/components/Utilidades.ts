import {isArray, isUndefined} from 'util';
import swal from 'sweetalert2';
import moment = require('moment');

declare var $:any;

export class Utilidades{

  static mensajeError(mensaje){
      console.log(mensaje)
      if(isUndefined(mensaje)){
        return 'El error esta indefinido';
    } else {
        if(isArray(mensaje.error)){
            return mensaje.error[0].msg;
        } else {
            if(isUndefined(mensaje.error.message))
                return 'Error en la API';
            else {
                if(mensaje.error.showMessage){
                    return mensaje.error.message;
                } else {
                    return 'Ha ocurrido un error'
                }
            }
        }
    }

  }

  static msgErrorImage(mensaje) {

      try {
          if(isUndefined(mensaje)) {
              this.showMsgError('El error esta indefinido');
          } else {
              this.showMsgError(JSON.parse(mensaje).error.message);
          }
      }
      catch(e) {
          console.log(e);
          console.log(mensaje);
          this.showMsgError("Ha ocurrido un error al decodificar el mensaje")
      }

  }

  //Invocacion de metodo para invocar modal y limpieza del formulario invocado
  static invocacionModal(Modal,Formulario){
    Modal.show();
    Formulario.reset();
  }

  static showMsgInfo(mensaje: string,titulo = 'Informacion'){
      swal(
          titulo,
          mensaje,
          'info'
      ).catch(swal.noop)
  }

  static showMsgError(mensaje : string,titulo = 'Error'){
     swal(
         titulo,
         mensaje,
         'error'
     ).catch(swal.noop)

  }

  static showMsgSucces(mensaje : string, titulo = 'Exitoso') {
      swal(
          titulo,
          mensaje,
          'success'
      ).catch(swal.noop)
  }

  static convertDate(d) {
      var parts = d.split('-');
      return new Date(parts[1], parts[0]);
  }

  static formatDateYYYYMMDD(myDate) {
    return moment(myDate).format('YYYY-MM-DD');
  }

  static getYearDate(myDate) {
      return moment(myDate,"YYYY-MM-DD").year();
  }

}
