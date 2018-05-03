const { matchedData } = require('express-validator/filter')
const { mssqlErrors } = require('../Utils/util');
const db = require('../services/database');
const sql = require('mssql');

function createCargo(req, res) {
    var data = matchedData(req);
    var aoj = [];
    db.pushAOJParam(aoj, 'NombreCargo',      sql.NVarChar(50),  data.NombreCargo);
    db.pushAOJParam(aoj, 'DescripcionCargo', sql.NVarChar(100), data.DescripcionCargo);
    db.storedProcExecute('USP_CREATE_CARGO', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        })
}

function getCargos(req, res) {
    let Habilitado = req.query.Habilitado;
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado',  sql.Int, Habilitado);
    db.storedProcExecute('USP_GET_CARGOS', aoj)
        .then((results) => {
            res.status(200).json({
                cargos: results.recordset
            })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function updateCargo(req, res) {
    var data = req.body;
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'IdCargo',          sql.Int,           data.IdCargo);
    db.pushAOJParam(aoj, 'NombreCargo',      sql.NVarChar(50),  data.NombreCargo);
    db.pushAOJParam(aoj, 'DescripcionCargo', sql.NVarChar(100), data.DescripcionCargo);
    db.storedProcExecute('USP_UPDATE_CARGO', aoj)
        .then((results) => {
            res.status(200).json({
                success: 'Cargo Actualizado Exitosamente!'
            })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getCargoById(req, res) {
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdCargo', sql.Int, data.IdCargo);
    db.storedProcExecute('USP_GET_CARGO', aoj)
        .then((results) => {
            res.status(200).json({ cargo: results.recordset[0] })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function changeStateCargo(req, res) {
    let IdCargo     = req.params.IdCargo;
    let Habilitado  = req.body.Habilitado;
    console.log('IdCargo:' + IdCargo, 'Habilitado:' + Habilitado);
    var aoj = [];
    db.pushAOJParam(aoj, 'IdCargo', sql.Int, IdCargo);
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, Habilitado);
    db.storedProcExecute('USP_DISP_CARGO', aoj)
        .then((results) => {
            console.log(results)
            let afectadas = results.rowsAffected[0]
            let accion = (Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
            res.status(200).json((afectadas > 0) ? { success: 'Cargo ' + accion + ' con exito!' } : { failed: 'No se encontro el producto solicitado!' })
            console.log('Cargo cambiado de estado con exito!')
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
            console.log('Error:', err)
        });
}
module.exports = {
    createCargo,
    getCargoById,
    getCargos,
    updateCargo,
    changeStateCargo
}