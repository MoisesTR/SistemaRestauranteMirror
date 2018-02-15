var sql = require('mssql')

function createProducto(pool,data){ 
    return pool.request()
    .input('IdCategoria',sql.Int,data.IdCategoria)
    .input('IdSubclasificacion',sql.Int,data.IdSubclasificacion)
    .input('IdEstado',sql.Int,data.IdEstado)
    .input('NombreProducto',sql.NVarChar(50),data.NombreProducto)
    .input('Descripcion',sql.NVarChar(200),data.Descripcion)
    .input('Imagen',sql.NVarChar(100),data.Imagen)
    .execute('USP_CREATE_PRODUCTO')
} 
function updateProducto(pool,data){
    return pool.request()
    .input('IdProducto',sql.Int,data.IdProducto)
    .input('IdCategoria',sql.Int,data.IdCategoria)
    .input('IdSubclasificacion',sql.Int,data.IdSubclasificacion)
    .input('IdEstado',sql.Int,data.IdEstado)
    .input('NombreProducto',sql.NVarChar(50),data.NombreProducto)
    .input('Descripcion',sql.NVarChar(200),data.Descripcion)
    .input('Imagen',sql.NVarChar(100),data.Imagen)
    .execute('USP_UPDATE_PRODUCTO')
}
function getProductos(pool,Habilitado){
    (!Habilitado ) ? console.log('sin query'): console.log('con query');
    return pool.request()
        .input('Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_PRODUCTOS');
}
function getProductoById(pool,IdProducto){
    return pool.request()
        .input('IdProducto',sql.Int,IdProducto)
        .execute('USP_GET_PRODUCTO')
}
function changeStateProducto(pool,IdProducto,Habilitado){
   console.log('Changing state')
   console.log(IdProducto+' ! ',Habilitado)
    return pool.request()
        .input('IdProducto',sql.Int,IdProducto)
        .input('Habilitado',sql.Int,Habilitado)
        .execute('USP_DISP_PRODUCTO')
}
module.exports={
    createProducto,
    getProductoById,
    getProductos,
    changeStateProducto,
    updateProducto
}