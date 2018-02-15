const config = require('../config/mssqlConfig');
const sql    = require('mssql');

function getProveedorById(req,res){
    var data = req.params;
    db.pushAOJParam(aoj, 'IdProveedor',sql.Int,IdProveedor)
        .execute('USP_GET_PROVEEDOR');
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getProveedorById(poolObt,data.IdProveedor)
        }).then((results) => {
           res.status(200).json({proveedor:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getProveedores(req,res){
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_PROVEEDORES');
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getProveedores(poolObt)
    }).then((results) => {
       res.status(200).json({proveedores:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createProveedor(req,res){
    var data = req.body
    console.log(data)
    db.pushAOJParam(aoj, 'NombreProveedor',sql.NVarChar(50),data.NombreProveedor)
        db.pushAOJParam(aoj, 'Direccion',sql.NVarChar(200),data.Direccion)
        db.pushAOJParam(aoj, 'Email',sql.NVarChar(100),data.Email)
        db.pushAOJParam(aoj, 'Descripcion',sql.NVarChar(200),data.Descripcion)
        db.pushAOJParam(aoj, 'NombreRepresentante',sql.NVarChar(200),data.NombreRepresentante)
        .execute('USP_CREATE_PROVEEDOR')
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.createProveedor(poolObt,data)
    }).then((results) => {
       res.status(200).json(results.recordset[0]) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function telefonoProveedor(req, res){
    db.pushAOJParam(aoj, 'IdProveedor',sql.Int,data.IdProveedor)
        db.pushAOJParam(aoj, 'Prefijo',sql.NVarChar(3),data.Prefijo)
        db.pushAOJParam(aoj, 'NumeroTelefono',sql.NVarChar(50),data.NumeroTelefono)
        .execute('USP_CREATE_NUMEROPROVEEDOR');
}
function updateTelefonoProveedor(req, res){
    db.pushAOJParam(aoj, 'IdProveedor',sql.Int,data.IdProveedor)
        db.pushAOJParam(aoj, 'IdNumero',sql.Int,data.IdNumero)
        db.pushAOJParam(aoj, 'Prefijo',sql.NVarChar(3),data.Prefijo)
        db.pushAOJParam(aoj, 'NumeroTelefono',sql.NVarChar(50),data.NumeroTelefono)
        .execute('USP_UPDATE_NUMERO_PROVEEDOR');
}
function updateProveedor(req,res){
    var data = req.body;
    db.pushAOJParam(aoj, 'IdProveedor',sql.Int,data.IdProveedor)
        db.pushAOJParam(aoj, 'NombreProveedor',sql.NVarChar(50),data.IdProveedor)
        db.pushAOJParam(aoj, 'Direccion',sql.NVarChar(200),data.Nombre)
        db.pushAOJParam(aoj, 'Email',sql.NVarChar(100),data.Email)
        db.pushAOJParam(aoj, 'Descripcion',sql.NVarChar(200),data.Descripcion)
        db.pushAOJParam(aoj, 'NombreRepresentante',sql.NVarChar(100),data.NombreRepresentante)
        .execute('USP_UPDATE_PROVEEDOR')
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.updateProveedor(poolObt,data)
    }).then((results) => {
       res.status(200).json({
           success:'Proveedor Actualizado con exito!!'
       }) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function changeStateProveedor(req,res){

}
module.exports={
    createProveedor,
    getProveedorById,
    getProveedores,
    updateProveedor,
    changeStateProveedor
}