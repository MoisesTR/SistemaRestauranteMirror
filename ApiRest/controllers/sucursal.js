const db                        = require('../services/database');
const sql                       = require('mssql');
const { mssqlErrors }           = require('../Utils/util');
const { matchedData, sanitize } = require('express-validator/filter');

function getSucursalById(req, res) {
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdSucursal', sql.Int, data.IdSucursal)
    db.storedProcExecute('USP_GET_SUCURSAL', aoj)
        .then((results) => {
            res.status(200).json({ sucursal: results.recordset[0] })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getSucursales(req, res) {
    let data = matchedData(req,{locations:['query']});
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado)
    db.storedProcExecute('USP_GET_SUCURSALES', aoj)
        .then((results) => {
            res.status(200).json({ sucursales: results.recordset })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function createSucursal(req, res) {
    var data = matchedData(req, {locations: 'body'});
    var aoj = [];
    db.pushAOJParam(aoj, 'NombreSucursal', sql.NVarChar(100), data.NombreSucursal)
    db.pushAOJParam(aoj, 'Direccion', sql.NVarChar(250), data.Direccion)
    db.pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), data.Telefono1)
    db.pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), data.Telefono2)
    db.storedProcExecute('USP_CREATE_SUCURSAL', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        })
}

function updateSucursal(req, res) {
    var data =  matchedData(req, {locations:['body','params']});
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'IdSucursal', sql.Int, data.IdSucursal)
    db.pushAOJParam(aoj, 'NombreSucursal', sql.NVarChar(100), data.NombreSucursal)
    db.pushAOJParam(aoj, 'Direccion', sql.NVarChar(250), data.Direccion)
    db.pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), data.Telefono1)
    db.pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), data.Telefono2)
    db.storedProcExecute('USP_UPDATE_SUCURSAL', aoj)
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json((afectadas > 0) ? { success: 'Sucursal modificada con exito!' } : { failed: 'No se encontro la Sucursal solicitada!' })

    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function changeStateSucursal(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});
    var aoj = [];
    console.log(data)
    db.pushAOJParam(aoj, 'IdSucursal', sql.Int, data.IdSucursal);
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit, +data.Habilitado);
    db.storedProcExecute('USP_DISP_SUCURSAL', aoj)
    .then((results) => {
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitada' : 'Habilitada';
        res.status(200).json((afectadas > 0) ? { success: 'Sucursal ' + accion + ' con exito!' } : { failed: 'No se encontro la Sucursal solicitada!' })
        console.log('Sucursal cambiada de estado con exito!')
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports = {
    createSucursal,
    updateSucursal,
    getSucursales,
    getSucursalById,
    changeStateSucursal
}