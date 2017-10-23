var sql = require('mssql')

function createSubClasificacion(pool,data){ 
    return  pool.request()
        .input('IdClasificacion',sql.Int,data.IdClasificacion)
        .input('Nombre',sql.NVarChar(50),data.Nombre)
        .input('Descripcion'.sql.NVarChar(150),data.Descripcion)
        .execute('USP_CREATE_SUBCLASIFICACION'); 
}
function getSubclasificaciones(pool){
    return pool.request()
        .execute('USP_GET_CLASIFICACIONES');
}
function getSubclasificacionById(pool, IdSubClasificacion){
    return pool.request()
        .input('IdSubClasificacion',sql.Int,IdSubClasificacion)
        .execute('USP_GET_SUBCLASIFICACION');
}
function getSubclasificacionesByIdClasificacion(pool,IdClasificacion){
    return pool.request()
        .input('IdClasificacion',sql.Int,IdClasificacion)
        .execute('USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION');
}
function disSubclasificaciones(pool,IdSubClasificacion){
    return pool.request()
        .input('IdSubClasificacion',sql.Int,IdSubClasificacion)
        .execute('USP_DISP_SUBCLASIFICACION');
}
function updateSubclasificacion(ool,data){
    return pool.request()
        .input('IdSubClasificacion',sql.Int,data.IdSubclasificacion)
        .input('IdClasificacion',sql.Int,data.IdClasificacion)
        .input('Nombre',sql.NVarChar(50),data.Nombre)
        .input('Descripcion'.sql.NVarChar(150),data.Descripcion)
        .execute('USP_UPDATE_SUBCLASIFICACION');
}
function getSubclasificacionById(pool,IdClasificacion){
    return pool.request()
        .input('IdClasificacion',sql.Int,IdClasificacion)
        .execute('USP_GET_CLASIFICACION');
}
module.exports={
    createSubClasificacion,
    getSubclasificacionById,
    getSubclasificaciones,
    updateSubclasificacion
}