var sql = require('mssql')

function getSucursales(pool,Habilitado){
    return pool.request()
        .input('Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_SUCURSALES')
}
 function getSucursal(pool,IdSucursal){
    return pool.request()
        .input('IdSucursal',sql.Int,IdSucursal)
        .execute('USP_GET_SUCURSAL')
}
function createSucursal(pool,data){
    return pool.request()
        .input('NombreSucursal',sql.Nvarchar(50),data.NombreSucursal)
        .input('Direccion',sql.Nvarchar(150),data.Direccion)
        .execute('USP_CREATE_SUCURSAL')
}
module.exports={
    getSucursal,
    getSucursales,
    createSucursal
}