var sql = require('mssql')

function createCategoria(pool,data){ 
    pool.request()
        .input('Nombre',sql.NVarChar(50),data.Nombre)
        .input('Descripcion'.sql.NVarChar(150),data.Descripcion)
        .execute('USP_CREATE_CATEGORIA')
    } 
function getCategorias(pool){
    pool.request()
        .execute('USP_GET_CATEGORIAS');
}
function updateCategoria(pool,data){
    pool.request()
        .input('IdCategoria',sql.Int,data.IdCategoria)
        .input('Nombre',sql.NVarChar(50),data.Nombre)
        .input('Descripcion'.sql.NVarChar(150),data.Descripcion)
        .execute('USP_UPDATE_CATEGORIA')
}
function getCategoriaById(pool,IdCategoria){
    pool.request()
        .input('IdCategoria',sql.Int,IdCategoria)
        .execute('USP_GET_CATEGORIA_BY_ID')
}
module.exports={
    createCategoria,
    getCategorias,
    updateCategoria,
    getCategoriaById
}