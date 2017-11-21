var sql = require('mssql')

function getTrabajadores(pool,Habilitado){
    return pool.request()
        .input('Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_TRABAJADORES')
}
 function getTrabajador(pool,IdSucursal){
    return pool.request()
        .input('IdTrabajador',sql.Int,IdSucursal)
        .execute('USP_GET_TRABAJADOR')
}
function createTrabajador(pool,trabajadorData){
    console.log(trabajadorData)
    return pool.request()
        .input('IdSucursal',sql.Int,trabajadorData.IdSucursal)
        .input('IdCargo',sql.Int,trabajadorData.IdCargo)
        .input('Nombres',sql.NVarChar(50),trabajadorData.Nombres)
        .input('Apellidos',sql.NVarChar(50),trabajadorData.Apellidos)
        .input('NumeroCedula',sql.NVarChar(50),trabajadorData.NumeroCedula)
        .input('FechaNacimiento',sql.Date,trabajadorData.FechaNacimiento)
        .input('Direccion',sql.NVarChar(300),trabajadorData.Direccion)    
        .input('FechaIngreso',sql.Date,trabajadorData.FechaIngreso)
        .execute('USP_CREATE_TRABAJADOR')
}
function changeStateTrabajador(pool,IdTrabajador,Habilitado){
    console.log('Changing state')
    console.log(IdTrabajador+' ! ',Habilitado)
     return pool.request()
         .input('IdProducto',sql.Int,IdTrabajador)
         .input('Habilitado',sql.Int,Habilitado)
         .execute('USP_DISP_TRABAJADOR')
 }
module.exports={
    createTrabajador,
    getTrabajador,
    getTrabajadores,
    changeStateTrabajador
}