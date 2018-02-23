const {mssqlErrors} = require('../Utils/util')
const { matchedData, sanitize } = require('express-validator/filter');
const db = require('../services/database');
const sql = require('mssql')

function getTrabajadorById(req,res){
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdTrabajador',sql.Int,data.IdSucursal);
    db.storedProcExecute('USP_GET_TRABAJADOR', aoj)
    .then((results) => {
        res.status(200).json({ trabajador:results.recordset[0] }) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function getTrabajadores(req,res){
    let Habilitado = req.query.Habilitado
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado);
    db.storedProcExecute('USP_GET_TRABAJADORES', aoj)
    .then((results) => {
       res.status(200).json({trabajadores:results.recordset}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function createTrabajador(req,res){
    var trabajadorData=matchedData(req,{locations:['body']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdSucursal',sql.Int,trabajadorData.IdSucursal);
    db.pushAOJParam(aoj, 'IdCargo',sql.Int,trabajadorData.IdCargo);
    db.pushAOJParam(aoj, 'Nombres',sql.NVarChar(50),trabajadorData.Nombres);
    db.pushAOJParam(aoj, 'Apellidos',sql.NVarChar(50),trabajadorData.Apellidos);
    db.pushAOJParam(aoj, 'NumeroCedula',sql.NVarChar(50),trabajadorData.NumeroCedula);
    db.pushAOJParam(aoj, 'Imagen', sql.NVarChar(50), trabajadorData.Imagen);
    db.pushAOJParam(aoj, 'FechaNacimiento',sql.Date,trabajadorData.FechaNacimiento);
    db.pushAOJParam(aoj, 'Direccion',sql.NVarChar(300),trabajadorData.Direccion);
    db.pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), trabajadorData.Telefono1);
    db.pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), trabajadorData.Telefono2);
    db.pushAOJParam(aoj, 'FechaIngreso',sql.Date,trabajadorData.FechaIngreso);
    db.pushOutParam(aoj, 'IdTrabajador', sql.Int)
    db.storedProcExecute('USP_CREATE_TRABAJADOR',aoj)
    .then((results) => {
        res.status(200).json(results.output)
    }).catch((err) => {
       res.status(500).json( mssqlErrors(err) ); 
    });
}
function updateTrabajador(req,res){
    var trabajadorData = matchedData(req);
    var aoj = [];
    db.pushAOJParam(aoj, 'IdSucursal',sql.Int,trabajadorData.IdSucursal);
    db.pushAOJParam(aoj, 'IdCargo',sql.Int,trabajadorData.IdCargo);
    db.pushAOJParam(aoj, 'Nombres',sql.NVarChar(50),trabajadorData.Nombres);
    db.pushAOJParam(aoj, 'Apellidos',sql.NVarChar(50),trabajadorData.Apellidos);
    db.pushAOJParam(aoj, 'NumeroCedula',sql.NVarChar(50),trabajadorData.NumeroCedula);
    db.pushAOJParam(aoj, 'Imagen', sql.NVarChar(50), trabajadorData.Imagen);
    db.pushAOJParam(aoj, 'FechaNacimiento',sql.Date,trabajadorData.FechaNacimiento);
    db.pushAOJParam(aoj, 'Direccion', sql.NVarChar(300), trabajadorData.Direccion);
    db.pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), trabajadorData.Telefono1);
    db.pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), trabajadorData.Telefono2);
    db.pushAOJParam(aoj, 'FechaIngreso',sql.Date, trabajadorData.FechaIngreso);
    db.pushAOJParam(aoj, 'IdTrabajador', sql.Int, trabajadorData.IdTrabajador);
    db.storedProcExecute('USP_UPDATE_TRABAJADOR',aoj)
    .then((results) => {
        res.status(200).json({
            success:'Trabajador actualizado con exito!'
        })
    }).catch((err) => {
       res.status(500).json( mssqlErrors(err) ); 
    });
}
function changeStateTrabajador(req,res){
    var data = matchedData(req);
    var aoj = [];   
    console.log('Changing state')
    db.pushAOJParam(aoj, 'IdProducto',sql.Int,data.IdTrabajador)
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado)
    db.storedProcExecute('USP_DISP_TRABAJADOR', aoj)
    .then((results) => {
        res.status(200).json({
            success:'Trabajador '+(Habilitado) ? 'Habilitado' : 'Deshabilitado' +' con exito!'
        })
        console.log('Trabajador '+(Habilitado) ? 'Habilitado' : 'Deshabilitado' +' con exito!')
    }).catch((err) => {
       res.status(500).json( mssqlErrors(err) ); 
    });
}
module.exports={
   createTrabajador,
   getTrabajadores,
   getTrabajadorById,
   updateTrabajador,
   changeStateTrabajador
}