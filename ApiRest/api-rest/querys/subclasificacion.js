var sql = require('mssql')

function createSubClasificacion(pool,data){ 
    pool.request()
        .input('IdClasificacion',sql.Int,data.IdClasificacion)
        .input('Nombre',sql.NVarChar(50),data.Nombre)
        .input('Descripcion'.sql.NVarChar(150),data.Descripcion)
        .execute('USP_CREATE_SUBCLASIFICACION'); 
}
function getSubclasificaciones(pool){
    pool.request()
        .execute('USP_GET_CLASIFICACIONES');
}
function getSubclasificacionById(pool, IdSubClasificacion){
    pool.request()
        .input('IdSubClasificacion',sql.Int,IdSubClasificacion)
        .execute('USP_GET_SUBCLASIFICACION');
}
function getSubclasificacionesByIdClasificacion(pool,IdClasificacion){
    pool.request()
        .input('IdClasificacion',sql.Int,IdClasificacion)
        .execute('USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION');
}
function disSubclasificaciones(pool,IdSubClasificacion){
    pool.request()
        .input('IdSubClasificacion',sql.Int,IdSubClasificacion)
        .execute('USP_DISP_SUBCLASIFICACION');
}
function updateSubclasificaciones(pool,data){
    pool.request()
        .input('IdSubClasificacion',sql.Int,data.IdSubclasificacion)
        .input('IdClasificacion',sql.Int,data.IdClasificacion)
        .input('Nombre',sql.NVarChar(50),data.Nombre)
        .input('Descripcion'.sql.NVarChar(150),data.Descripcion)
        .execute('USP_UPDATE_SUBCLASIFICACION');
}
function getSubclasificacionById(pool,IdClasificacion){
    pool.request()
        .input('IdClasificacion',sql.Int,IdClasificacion)
        .execute('USP_GET_CLASIFICACION');
}
module.exports={
    createSubClasificacion,
    getSubclasificacionById,
    getSubclasificaciones
}