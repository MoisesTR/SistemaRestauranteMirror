var sql = require('mssql')

function getEmpaques(pool){
    pool.request()
        .execute('USP_GET_EMPAQUES')
}
function getEmpaque(pool,IdEmpaque){
    pool.request()
        .input('IdEmpaque',sql.Int,IdEmpaque)
        .query('SELECT IdEmpaque,NombreEmpaque,Descripcion,Habilitado FROM EMPAQUE WHERE IdEmpaque = @IdEmpaque')
}
function createEmpaque(pool,data){
    pool.request()
        .input('NombreEmpaque',sql.Nvarchar )
        .input('Descripcion',sql)
        .execute('USP_CREATE_EMPAQUE')
}
module.exports={
    getEmpaque,
    createEmpaque,
    getEmpaques
}
