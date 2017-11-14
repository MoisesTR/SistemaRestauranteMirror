var sql = require('mssql')

function createProductoProveedor(pool,data){ 
    return pool.request()
    .input('IdProducto',sql.Int,data.IdProducto)
    .input('IdProveedor',sql.Int,data.IdProveedor)
    .input('IdEnvase',sql.Int,data.IdEnvase)
    .input('IdEmpaque',sql.Int,data.IdEmpaque)
    .input('Costo',sql.Float,data.Costo)
    .input('CantidadEmpaque',sql.Int,data.CantidadEmpaque)
    .input('IdUnidadMedida',sql.Int,data.IdUnidadMedida)
    .input('ValorUnidadMedida',sql.Float,data.ValorUnidadMedida)
    .execute('USP_CREATE_PRODUCTO_PROVEEDOR')
} 
function updateProductoProveedor(pool,data){
    return pool.request()
    .input('IdProductoProveedor',sql.Int,data.IdProducto)
    .input('IdEnvase',sql.Int,data.IdEnvase)
    .input('IdEmpaque',sql.Int,data.IdEmpaque)
    .input('Costo',sql.Float,data.Costo)
    .input('CantidadEmpaque',sql.Int,data.CantidadEmpaque)
    .input('IdUnidadMedida',sql.Int,data.IdUnidadMedida)
    .input('ValorUnidadMedida',sql.Float,data.ValorUnidadMedida).execute('USP_UPDATE_PRODUCTO')
}
function getProductosProveedores(pool){
    return pool.request()
        .execute('USP_GET_PRODUCTOS_PROVEEDORES');
}
function getProductoProveedorById(pool,IdProductoProveedor){
    return pool.request()
        .input('IdProductoProveedor',sql.Int,IdProductoProveedor)
        .execute('USP_GET_PRODUCTO_PROVEEDOR')
}
function changeStateProductoProveedor(pool,IdProductoProveedor){
    return pool.request()
        .input('IdProductoProveedor',sql.Int,IdProductoProveedor)
        .execute('USP_DISP_PRODUCTO_PROVEEDOR')
}
module.exports={
    getProductosProveedores
    }