var sql = require('mssql')

function createCategoria(pool,data){ 
    return pool.request()
        .input('NombreCategoria',sql.NVarChar(50),data.NombreCategoria)
        .input('DescripcionCategoria',sql.NVarChar(150),data.DescripcionCategoria)
        .execute('USP_CREATE_CATEGORIA')
    } 
function getCategorias(pool){
    return pool.request()
        .execute('USP_GET_CATEGORIAS');
}
function updateCategoria(pool,data){
    return pool.request()
        .input('IdCategoria',sql.Int,data.IdCategoria)
        .input('NombreCategoria',sql.NVarChar(50),data.NombreCategoria)
        .input('DescripcionCategoria',sql.NVarChar(150),data.DescripcionCategoria)
        .execute('USP_UPDATE_CATEGORIA')
}
function getCategoriaById(pool,IdCategoria){
    return pool.request()
        .input('IdCategoria',sql.Int,IdCategoria)
        .execute('USP_GET_CATEGORIA_BY_ID')
}
module.exports={
    createCategoria,
    getCategorias,
    updateCategoria,
    getCategoriaById
}