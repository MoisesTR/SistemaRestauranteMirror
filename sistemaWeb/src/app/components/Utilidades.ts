export class Utilidades{

  //Metodo para retornar el mensje de error que genera la excepcion en sql
  static mensajeError(error){

    return JSON.parse(error._body).mensaje

  }
}
