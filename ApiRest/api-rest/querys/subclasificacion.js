var sql = require('mssql')

function createSubClasificacion(pool,data){ 
    console.log(data);
    return  pool.request()
        .input('IdClasificacion',sql.Int,data.IdClasificacion)
        .input('NombreSubClasificacion',sql.NVarChar(50),data.NombreSubClasificacion)
        .input('DescripcionSubClasificacion',sql.NVarChar(150),data.DescripcionSubClasificacion)
        .execute('USP_CREATE_SUBCLASIFICACION'); 
}
function getSubclasificaciones(pool){
    return pool.request()
        .execute('USP_GET_SUBCLASIFICACIONES');
}
function getSubclasificacionById(pool, IdSubClasificacion){
    console.log('subclas')
    return pool.request()
        .input('IdSubClasificacion',sql.Int,IdSubClasificacion)
        .execute('USP_GET_SUBCLASIFICACION');
}
function getSubclasificacionesByIdClasificacion(pool,IdClasificacion){
    console.log('buscando');
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
        .input('NombreClasificacion',sql.NVarChar(50),data.NombreClasificacion)
        .input('DescripcionClasificacion'.sql.NVarChar(150),data.DescripcionClasificacion)
        .execute('USP_UPDATE_SUBCLASIFICACION');
}
function getSubclasificacionById(pool,IdSubClasificacion){
    return pool.request()
        .input('IdSubClasificacion',sql.Int,IdSubClasificacion)
        .execute('USP_GET_SUBCLASIFICACION');
}
function changeStateSubClasificacion(pool,IdSubClasificacion,Habilitado){
    console.log('Changing state')
    console.log(IdSubClasificacion+' ! ',Habilitado)
     return pool.request()
         .input('IdSubClasificacion',sql.Int,IdSubClasificacion)
         .input('Habilitado',sql.Int,Habilitado)
         .execute('USP_DISP_SUBCLASIFICACION')
 }
module.exports={
    createSubClasificacion,
    getSubclasificacionById,
    getSubclasificaciones,
    updateSubclasificacion,
    getSubclasificacionesByIdClasificacion,
    changeStateSubClasificacion
}