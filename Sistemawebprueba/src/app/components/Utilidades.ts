export class Utilidades{

  //Metodo para retornar el mensje de error que genera la excepcion en sql
  static mensajeError2(error){
    return error['error'].message ;

  }

  static mensajeErrorSql(error){
    
    if(error.status == 500) {
      return 'Error interno en el servidor';
    } else {
      return JSON.parse(error._body)['message'];
    }
  }

  //Invocacion de metodo para invocar modal y limpieza del formulario invocado
  static invocacionModal(Modal,Formulario){

    Modal.show();
    Formulario.reset();
  }

}
