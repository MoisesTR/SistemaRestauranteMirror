const db    = require('../services/database');  
const sql   = require('mssql');
const {matchedData} = require('express-validator/filter')

function getProveedorById(req,res){
    const data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor',sql.Int,IdProveedor)
    db.storedProcExecute('USP_GET_PROVEEDOR', aoj)
    .then((results) => {
        res.status(200).json({proveedor:results.recordset[0]}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function getProveedores(req,res){
    var aoj =[];
    var Habilitado = req.params.Habilitado;
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado)
    db.storedProcExecute('USP_GET_PROVEEDORES', aoj)
    .then((results) => {
       res.status(200).json({proveedores:results.recordset}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function createProveedor(req,res){
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'NombreProveedor',sql.NVarChar(50),data.NombreProveedor);
    db.pushAOJParam(aoj, 'Direccion',sql.NVarChar(200),data.Direccion);
    db.pushAOJParam(aoj, 'Email',sql.NVarChar(100),data.Email);
    db.pushAOJParam(aoj, 'Descripcion',sql.NVarChar(200),data.Descripcion)
    db.pushAOJParam(aoj, 'NombreRepresentante',sql.NVarChar(200),data.NombreRepresentante)
    db.storedProcExecute('USP_CREATE_PROVEEDOR', aoj)
    .then((results) => {
       res.status(200).json(results.recordset[0]) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function telefonoProveedor(req, res){
    var data = matchedData(req);
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor',sql.Int,data.IdProveedor)
    db.pushAOJParam(aoj, 'Prefijo',sql.NVarChar(3),data.Prefijo)
    db.pushAOJParam(aoj, 'NumeroTelefono',sql.NVarChar(50),data.NumeroTelefono)
    db.storedProcExecute('USP_CREATE_NUMEROPROVEEDOR', aoj)
    .then((result) => {
        res.status(200).json(result.recordset[0]);
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function updateTelefonoProveedor(req, res){
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor',sql.Int,data.IdProveedor)
    db.pushAOJParam(aoj, 'IdNumero',sql.Int,data.IdNumero)
    db.pushAOJParam(aoj, 'Prefijo',sql.NVarChar(3),data.Prefijo)
    db.pushAOJParam(aoj, 'NumeroTelefono',sql.NVarChar(50),data.NumeroTelefono)
    db.storedProcExecute('USP_UPDATE_NUMERO_PROVEEDOR', aoj)
    .then((result) => {
        
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function updateProveedor(req,res){
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor',sql.Int,data.IdProveedor)
    db.pushAOJParam(aoj, 'NombreProveedor',sql.NVarChar(50),data.IdProveedor)
    db.pushAOJParam(aoj, 'Direccion',sql.NVarChar(200),data.Nombre)
    db.pushAOJParam(aoj, 'Email',sql.NVarChar(100),data.Email)
    db.pushAOJParam(aoj, 'Descripcion',sql.NVarChar(200),data.Descripcion)
    db.pushAOJParam(aoj, 'NombreRepresentante',sql.NVarChar(100),data.NombreRepresentante)
    db.storedProcExecute('USP_UPDATE_PROVEEDOR', aoj)
    .then((results) => {
       res.status(200).json({
           success:'Proveedor Actualizado con exito!!'
       }) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
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