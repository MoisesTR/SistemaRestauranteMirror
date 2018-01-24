    var sql = require('mssql')

function getEnvases(pool,Habilitado){
    return pool.request()
        .input('Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_ENVASES');
}
function getEnvase(pool,IdEnvase){
    return pool.request()
        .input('IdEnvase',sql.Int,IdEnvase)
        .query('SELECT IdEnvase,NombreEnvase,Descripcion,Habilitado FROM ENVASE where IdEnvase = @IdEnvase')
}
function createEnvase(pool,data){
    return pool.request()
        .input('NombreEnvase',sql.NVarChar(50),data.NombreEnvase)
        .input('Descripcion',sql.NVarChar(150),data.Descripcion)
        .execute('USP_CREATE_ENVASE')
}
module.exports={
    getEnvases,
    createEnvase,
    getEnvase
}