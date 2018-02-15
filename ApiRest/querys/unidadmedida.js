var sql = require('mssql')

function getUnidades(pool){
   return  pool.request()
        .execute('USP_GET_UNIDADES_DE_MEDIDA')
}
function createUnidadMedida(pool,data){
        return pool.request()
        .input('IdClasificacionUnidadMedida',sql.Int,data.IdClasificacionUnidadMedida)
        .input('NombreUnidad',sql.NVarChar(50),data.NombreUnidad)
        .input('Simbolo',sql.NVarChar(3),data.Simbolo)
        .execute('USP_CREATE_UNIDAD_MEDIDA')
}
function getUnidadMedida(pool,IdUnidadMedida){
        return pool.request()
        .input('IdUnidadMedida',sql.Int,IdUnidadMedida)
        .execute('USP_GET_UNIDAD_DE_MEDIDA')
}
module.exports={
        createUnidadMedida,
        getUnidades,
        getUnidadMedida
}