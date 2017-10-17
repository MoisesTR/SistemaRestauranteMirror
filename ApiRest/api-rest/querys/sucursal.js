var sql = require('mssql')

function getSucursales(pool){
    return pool.request()
        .execute('USP_GET_SUCURSALES')
}
 function getSucursal(pool,IdSucursal){
    return pool.request()
        .input('IdSucursal',sql.Int,IdSucursal)
        .execute('USP_GET_SUCURSAL')
}
function createSucursal(pool,data){
    return pool.request()
        .input('NombreSucursal',sql.Nvarchar(50),data.NombreEnvase)
        .input('Direccion',sql.Nvarchar(150),data.Descripcion)
        .input('TelefonoPrincipal')
        .execute('USP_CREATE_SUCURSAL')
}
module.exports={
    getSucursal,
    getSucursales,
    createSucursal
}