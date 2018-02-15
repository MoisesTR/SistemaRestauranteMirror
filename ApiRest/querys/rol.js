var sql = require('mssql')

function createRol(pool,data){ 
    return pool.request()
        .input('NombreRol',sql.NVarChar(50),data.NombreRol)
        .input('DescripcionRol',sql.NVarChar(150),data.DescripcionRol)
        .execute('USP_CREATE_ROL_USUARIO')
    } 
function getRoles(pool,Habilitado){
    return pool.request()
        .input('Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_ROLES');
}
function updateRol(pool,data){
    return pool.request()
        .input('IdRol',sql.Int,data.IdRol)
        .input('NombreRol',sql.NVarChar(50),data.NombreRol)
        .input('DescripcionRol',sql.NVarChar(150),data.DescripcionRol)
        .execute('USP_UPDATE_ROL')
}
function getRolById(pool,IdRol){
    return pool.request()
        .input('IdRol',sql.Int,IdRol)
        .execute('USP_GET_ROL')
}
module.exports={
    createRol,
    getRoles,
    updateRol,
    getRolById
}