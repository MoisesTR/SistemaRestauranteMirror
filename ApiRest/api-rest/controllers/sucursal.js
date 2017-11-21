const querys = require('../querys/sucursal');
const config = require('../config/mssqlConfig');
const sql = require('mssql');
const database = require('../services/database');
const { matchedData, sanitize } = require('express-validator/filter');

function getSucursalById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getSucursal(poolObt,data.IdSucursal)
        }).then((results) => {
           res.status(200).json({sucursal:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getSucursales(req,res){
    let Habilitado = req.query.Habilitado
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getSucursales(poolObt,Habilitado)
    }).then((results) => {
        res.status(200).json({sucursales:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createSucursal(req,res){
    var data = req.body;
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.createSucusal(poolObt,data)
    }).then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json(err)
    })
}
function getTelefonos(req,res){         
    const Habilitado = req.query.Habilitado;
    var aoj=[];
    database.pushAOJParam('Habilitado',sql.Int,Habilitado);
    database.storedProcExecute('')
}
function getTelefonoSucursal(req,res){
    let telefoData = req.params;
    var aoj =[];
    database.pushAOJParam(aoj,'IdTelefonoSucursal',sql.Int,telefoData.IdTelefonoSucursal)
    database.pushAOJParam(aoj,'IdSucursal',sql.Int,telefoData.IdSucursal);
    database.storedProcExecute('USP_GET_TELEFONO_SUCURSAL',aoj).then((results) => {
       res.status(200).json({telefono:results.recordset[0]}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function getTelefonosBySucursalId(req,res){
    let IdSucursal = req.params.IdSucursal;
    let Habilitado = req.query.Habilitado;
    var aoj = [];
    database.pushAOJParam(aoj,'IdSucursal',sql.Int,IdSucursal);
    database.pushAOJParam(aoj,'Habilitado',sql.Int,Habilitado)
    database.storedProcExecute('USP_GET_TELEFONOS_SUCURSAL',aoj).then((results) => {
       res.status(200).json({telefonos:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createTelefonoSucursal(req,res){
    const IdSucursal = req.params.IdSucursal;
    const telefoData = matchedData(req,{locations:'body'});
    var aoj = [];
    database.pushAOJParam(aoj,'IdSucursal',sql.Int,IdSucursal);
	database.pushAOJParam(aoj,'IdOperadora',sql.Int,telefoData.IdOperadora);
    database.pushAOJParam(aoj,'NumeroTelefono',sql.NVarChar(20),telefoData.IdOperadora);
    database.storedProcExecute('USP_CREATE_TELEFONO_SUCURSAL',aoj).then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json(err);
    })
}
function updateTelefonoSucursal(req,res){
    const telefoData = matchedData(req,{locations:'body'});
    var aoj = [];
    database.pushAOJParam(aoj,'IdTelefonoSucursal',sql.Int,telefoData.IdTelefonoSucursal    )
    database.pushAOJParam(aoj,'IdSucursal',sql.Int,telefoData.IdSucursal);
	database.pushAOJParam(aoj,'IdOperadora',sql.Int,telefoData.IdOperadora);
    database.pushAOJParam(aoj,'NumeroTelefono',sql.NVarChar(20),telefoData.IdOperadora);
    database.storedProcExecute('USP_UPDATE_TELEFONO_SUCURSAL',aoj).then((results) => {
        res.status(200).json({
            success:'Producto Actualizado exitosamente!!'
        })
        console.log('Producto Actualizado con exito!')
    }).catch((err) => {
        res.status(500).json(err);
    })
}
function changeStateTelefonoSucursal(req,res){
    let telefoData= req.params
    let Habilitado = req.body.Habilitado
    console.log('IdTelefonoSucursal:'+telefoData.IdTelefonoSucursal,'Habilitado:'+Habilitado)
    var aoj=[];
    database.pushAOJParam(aoj,'IdTelefonoSucursal',sql.Int,telefoData.IdTelefonoSucursal)
    database.pushAOJParam(aoj,'IdSucursal',sql.Int,telefoData.IdSucursal);
	database.pushAOJParam(aoj,'Habilitado',sql.Int,Habilitado)
    database.storedProcExecute('USP_DISP_TELEFONO_SUCURSAL',aoj).then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? {success:'Telefono '+accion+' con exito!'} :{failed:'No se encontro el telefono solicitado!'})
        console.log('Telefono ha cambiado de estado con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
       console.log('Error:',err)
    });
}
module.exports={
    createSucursal,
    getSucursales,
    getSucursalById,
    createTelefonoSucursal,
    updateTelefonoSucursal,
    changeStateTelefonoSucursal,
    getTelefonosBySucursalId,
    getTelefonoSucursal
}