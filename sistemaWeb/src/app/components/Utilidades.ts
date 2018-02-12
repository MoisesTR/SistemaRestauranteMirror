export class Utilidades{

  //Metodo para retornar el mensje de error que genera la excepcion en sql
  static mensajeError(error){  
    return error['error'].mensaje;

  }
}
