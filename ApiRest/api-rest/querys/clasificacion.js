var sql = require('mssql')

function createClasificacion(pool,data){ 
    pool.request()
        .input('Nombre',sql.NVarChar(50),data.Nombre)
        .input('Descripcion'.sql.NVarChar(150),data.Descripcion)
        .execute('USP_CREATE_CLASIFICACION');
    } 
function getClasificaciones(pool){
    pool.request()
        .execute('USP_GET_CLASIFICACIONES');
}
function dispClasificacion(pool,IdClasificacion){
    pool.request()
        .input('IdClasificacion',sql.Int,IdClasificacion)
        .execute('USP_DISP_CLASIFICACION')
}
function updateClasificacion(pool,data){
    pool.request()
        .input('IdClasificacion',sql.Int,data.IdClasificacion)
        .input('Nombre',sql.NVarChar(50),data.Nombre)
        .input('Descripcion'.sql.NVarChar(150),data.Descripcion)
        .execute('USP_UPDATE_CLASIFICACION');
}
function getCategoriaById(pool,IdClasificacion){
    pool.request()
        .input('IdClasificacion',sql.Int,IdClasificacion)
        .execute('USP_GET_CLASIFICACION');
}
module.exports={
    createCategoria,
    getCategorias,
    updateCategoria,
    getCategoriaById
}