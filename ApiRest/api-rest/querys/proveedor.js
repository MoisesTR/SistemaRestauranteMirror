var sql = require('mssql')

function createProveedor(pool,data){ 
    return pool.request()
        .input('NombreProveedor',sql.NVarChar(50),data.NombreProveedor)
        .input('Direccion',sql.NVarChar(200),data.Direccion)
        .input('Email',sql.NVarChar(100),data.Email)
        .input('Descripcion',sql.NVarChar(200),data.Descripcion)
        .input('NombreRepresentante',sql.NVarChar(200),data.NombreRepresentante)
        .execute('USP_CREATE_PROVEEDOR')
} 
function getProveedores(pool){
    return pool.request()
        .execute('USP_GET_PROVEEDORES');
}
function updateProveedor(pool,data){
    return pool.request()
        .input('IdProveedor',sql.Int,data.IdProveedor)
        .input('NombreProveedor',sql.NVarChar(50),data.IdProveedor)
        .input('Direccion',sql.NVarChar(200),data.Nombre)
        .input('Email',sql.NVarChar(100),data.Email)
        .input('Descripcion',sql.NVarChar(200),data.Descripcion)
        .input('NombreRepresentante',sql.NVarChar(100),data.NombreRepresentante)
        .execute('USP_UPDATE_PROVEEDOR')
}
function createNumeroProvedoor(pool,data){
    return pool.request()
        .input('IdProveedor',sql.Int,data.IdProveedor)
        .input('Prefijo',sql.NVarChar(3),data.Prefijo)
        .input('NumeroTelefono',sql.NVarChar(50),data.NumeroTelefono)
        .execute('USP_CREATE_NUMEROPROVEEDOR');
}
function updateNumeroProveedor(pool,data){
    return pool.request()
        .input('IdProveedor',sql.Int,data.IdProveedor)
        .input('IdNumero',sql.Int,data.IdNumero)
        .input('Prefijo',sql.NVarChar(3),data.Prefijo)
        .input('NumeroTelefono',sql.NVarChar(50),data.NumeroTelefono)
        .execute('USP_UPDATE_NUMEROPROVEEDOR');
}
function getProveedorById(pool,IdProveedor){
    return pool.request()
        .input('IdProveedor',sql.Int,IdProveedor)
        .execute('USP_GET_PROVEEDOR');
}
module.exports={
    createProveedor,
    getProveedores,
    updateProveedor,
    createNumeroProvedoor,
    getProveedorById,
    updateNumeroProveedor
}