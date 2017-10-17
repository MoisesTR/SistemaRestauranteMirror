var sql = require('mssql')

function getUnidades(pool){
   return  pool.request()
        .execute('USP_GET_UNIDADES_DE_MEDIDA')
}
function getUnidadMedida(pool,IdUnidad)