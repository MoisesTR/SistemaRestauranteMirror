var sql = require('mssql')

function createClasificacion(pool,data){ 
    return pool.request()
        .input('NombreClasificacion',sql.NVarChar(50),data.NombreClasificacion)
        .input('DescripcionClasificacion',sql.NVarChar(150),data.DescripcionClasificacion)
        .execute('USP_CREATE_CLASIFICACION');
    } 
function getClasificaciones(pool,Habilitado){
    return pool.request()
        .input('Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_CLASIFICACIONES');
}
function dispClasificacion(pool,IdClasificacion){
    return pool.request()
        .input('IdClasificacion',sql.Int,IdClasificacion)
        .execute('USP_DISP_CLASIFICACION')
}
function updateClasificacion(pool,data){
    return pool.request()
        .input('IdClasificacion',sql.Int,data.IdClasificacion)
        .input('NombreClasificacion',sql.NVarChar(50),data.NombreClasificacion)
        .input('DescripcionClasificacion',sql.NVarChar(150),data.DescripcionClasificacion)
        .execute('USP_UPDATE_CLASIFICACION');
}
function getClasificacionById(pool,IdClasificacion){
    console.log('clasificacion')
    return pool.request()
        .input('IdClasificacion',sql.Int,IdClasificacion)
        .execute('USP_GET_CLASIFICACION');
}
module.exports={
    createClasificacion,
    getClasificaciones,
    updateClasificacion,
    getClasificacionById
}