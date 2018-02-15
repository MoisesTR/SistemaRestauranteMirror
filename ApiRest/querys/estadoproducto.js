var sql = require('mssql')

function getEstados(pool){
    return pool.request()
        .execute('USP_GET_ESTADOSPRODUCTO')
}
function getEstadoById(pool,IdEstado){
    return pool.request()
        .input('IdEstado',sql.Int,IdEstado)
        .execute('USP_GET_ESTADOPRODUCTO_BY_ID')
}
module.exports={
    getEstados,
    getEstadoById
}