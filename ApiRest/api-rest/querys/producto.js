var sql = require('mssql')

function createProducto(pool,data){ 
    return pool.request()
    .input('IdCategoria',sql.Int,data.IdCategoria)
    .input('IdSubclasificacion',sql.Int,data.IdSubclasificacion)
    .input('IdEnvase',sql.Int,data.IdEnvase)
    .input('IdEmpaque',sql.Int,data.IdEmpaque)
    .input('IdEstado',sql.Int,data.IdEstado)
    .input('IdProveedor',sql.Int,data.IdProveedor)
    .input('NombreProducto',sql.NVarChar(50),data.NombreProducto)
    .input('Costo',sql.Float,data.Costo)
    .input('Descripcion',sql.NVarChar(200),data.Descripcion)
    .input('CantidadEmpaque',sql.Int,data.CantidadEmpaque)
    .input('Imagen',sql.NVarChar(100),data.Imagen)
    .input('IdUnidadMedida',sql.Int,data.IdUnidadMedida)
    .input('ValorUnidadMedida',sql.Float,data.ValorUnidadMedida)
    .execute('USP_CREATE_PRODUCTO')
} 
function updateProducto(pool,data){
    return pool.request()
    .input('IdProducto',sql.Int,data.IdProducto)
    .input('IdCategoria',sql.Int,data.IdCategoria)
    .input('IdSubclasificacion',sql.Int,data.IdSubclasificacion)
    .input('IdEnvase',sql.Int,data.IdEnvase)
    .input('IdEmpaque',sql.Int,data.IdEmpaque)
    .input('IdEstado',sql.Int,data.IdEstado)
    .input('IdProveedor',sql.Int,data.IdProveedor)
    .input('NombreProducto',sql.NVarChar(50),data.NombreProducto)
    .input('Costo',sql.Float,data.Costo)
    .input('Descripcion',sql.NVarChar(200),data.Descripcion)
    .input('CantidadEmpaque',sql.Int,data.CantidadEmpaque)
    .input('Imagen',sql.NVarChar(100),data.Imagen)
    .input('IdUnidadMedida',sql.Int,data.IdUnidadMedida)
    .input('ValorUnidadMedida',sql.Float,data.ValorUnidadMedida)
    .execute('USP_UPDATE_PRODUCTO')
}
function getProductos(pool){
    return pool.request()
        .execute('USP_GET_PRODUCTOS');
}
function getProductoById(pool,IdProducto){
    return pool.request()
        .input('IdProducto',sql.Int,IdProducto)
        .execute('USP_GET_PRODUCTO')
}
function changeStateProducto(pool,IdProducto){
    return pool.request()
        .input('IdProducto',sql.Int,IdProducto)
        .execute('USP_DISP_PRODUCTO')
}
module.exports={
    createProducto,
    getProductoById,
    getProductos,
    changeStateProducto,
    updateProducto
}