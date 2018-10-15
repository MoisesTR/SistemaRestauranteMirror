import swal from 'sweetalert2';
import * as moment from 'moment';

export class Utils{

  static msgError(mensaje) {
      console.log('MENSAJE ERROR');
      console.log(mensaje);
      if (mensaje === undefined) {
        return 'El error esta indefinido';
    } else {
        if (Array.isArray(mensaje.error)) {
            return mensaje.error[0].msg;
        } else {
            if (mensaje.error.message === undefined) {
                return 'Error en la API';
            } else {
                if (mensaje.error.showMessage){
                    return mensaje.error.message;
                } else {
                    return mensaje.error.message;
                }
            }
        }
    }

  }

  static msgErrorImage(mensaje, titulo = 'Error') {
      console.log('MENSAJE ERROR IMAGEN');
      console.log(mensaje);
      try {
          if (mensaje === undefined) {
              this.showMsgError('El error esta indefinido', titulo);
          } else {
              this.showMsgError(mensaje.error.message, titulo);
          }
      } catch (e) {
          console.log(e);
          console.log(mensaje);
          this.showMsgError(JSON.parse(mensaje).message, titulo);
      }

  }

  // Invocacion de metodo para invocar modal y limpieza del formulario invocado
  static invocacionModal(Modal, Formulario) {
    Modal.show();
    Formulario.reset();
  }

  static showMsgInfo(mensaje: string, titulo = 'Información') {
      swal(
          titulo,
          mensaje,
          'info'
      ).catch(swal.noop);
  }

  static showMsgError(mensaje: string, titulo = 'Error') {
     swal(
         titulo,
         mensaje,
         'error'
     ).catch(swal.noop);

  }

  static showMsgSucces(mensaje : string, titulo = 'Exitoso') {
      swal(
          titulo,
          mensaje,
          'success'
      ).catch(swal.noop);
  }

  static formatDateYYYYMMDD(myDate) {
    return moment(myDate).format('YYYY-MM-DD');
  }

  static valorCampoEsValido(valor: any): any {
      let resultado = false;
      if (!(valor === '' || valor === null || valor === undefined)) {
          resultado = true;
      }
      return resultado;
  }

  static notNullOrUndefined(valor: any) {
      let resultado = false;
      if (!(valor === null || valor === undefined)) {
          resultado = true;
      }
      return resultado;
  }

  static getYearDate(myDate) {
      return moment(myDate, 'YYYY-MM-DD').year();
  }

  static replaceCharacter(cadena: string) {
      return cadena.replace('-', '');
  }

  static printReport(idReporte, preview, catalogo, nativeWindow) {
      nativeWindow.open('http://localhost:3000/reports?shortid=' + idReporte + '&preview=' + preview + '&catalogoApi=' + catalogo );
  }

  static printReportFactura(idReporte, preview, catalogo, idFactura, idEstadoFactura, nativeWindow) {
      nativeWindow.open('http://localhost:3000/reports?shortid=' + idReporte + '&preview=' + preview + '&catalogoApi=' + catalogo + '&IdFactura=' + idFactura + '&IdEstadoFactura' + idEstadoFactura );
  }

}
