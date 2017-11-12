var sql = require('mssql')

function getEmpaques(pool){
    return pool.request()
        .execute('USP_GET_EMPAQUES')
}
function getEmpaque(pool,IdEmpaque){
    return pool.request()
        .input('IdEmpaque',sql.Int,IdEmpaque)
        .query('SELECT IdEmpaque,NombreEmpaque,Descripcion,Habilitado FROM EMPAQUE WHERE IdEmpaque = @IdEmpaque')
}
function createEmpaque(pool,data){
    return pool.request()
        .input('NombreEmpaque',sql.NVarChar(50),data.NombreEmpaque)
        .input('Descripcion',sql.NVarChar(150),data.Descripcion)
        .execute('USP_CREATE_EMPAQUE')
}
module.exports={
    getEmpaque,
    createEmpaque,
    getEmpaques
}
