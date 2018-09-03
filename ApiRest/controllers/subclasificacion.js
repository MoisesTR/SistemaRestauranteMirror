const { mssqlErrors }   = require('../Utils/util')
const db                = require('../services/database');
const sql               = require('mssql');
const {matchedData }    = require('express-validator/filter')

function getSubclasificacionById(req, res) {
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdSubClasificacion', sql.Int, data.IdSubClasificacion)
    db.storedProcExecute('USP_GET_SUBCLASIFICACION', aoj)
        .then((results) => {
            res.status(200).json({ subclasificacion: results.recordset[0] })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getSubclasificaciones(req, res) {
    var data = matchedData(req,{locations:['query']});
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado)
    db.storedProcExecute('USP_GET_SUBCLASIFICACIONES', aoj)
        .then((results) => {
            res.status(200).json({
                subclasificaciones: results.recordset
            });
        }).catch((err) => {
            console.dir(err)
            res.status(500).json(mssqlErrors(err));
        });
}

function createSubclasificacion(req, res) {
    var data = matchedData(req,{locations:['body']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdClasificacion', sql.Int, data.IdClasificacion)
    db.pushAOJParam(aoj, 'NombreSubClasificacion', sql.NVarChar(50), data.NombreSubClasificacion)
    db.pushAOJParam(aoj, 'DescripcionSubClasificacion', sql.NVarChar(150), data.DescripcionSubClasificacion)
    db.storedProcExecute('USP_CREATE_SUBCLASIFICACION', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function updateSubclasificacion(req, res) {
    var data = matchedData(req, {locations: ['body', 'params']});
    var aoj = [];

    console.log(data);

    db.pushAOJParam(aoj, 'IdSubClasificacion', sql.Int, data.IdSubClasificacion)
    db.pushAOJParam(aoj, 'IdClasificacion', sql.Int, data.IdClasificacion)
    db.pushAOJParam(aoj, 'NombreSubClasificacion', sql.NVarChar(50), data.NombreSubClasificacion)
    db.pushAOJParam(aoj, 'DescripcionSubClasificacion', sql.NVarChar(150), data.DescripcionSubClasificacion)
    db.storedProcExecute('USP_UPDATE_SUBCLASIFICACION', aoj)
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json((afectadas > 0) ? { success: 'SubClasificacion modificada con exito!' } : { failed: 'No se encontro la SubClasificacion solicitada!' })

    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function getSubclasificacionesByIdClasificacion(req, res) {
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdClasificacion', sql.Int, data.IdClasificacion)
    db.storedProcExecute('USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION', aoj)
        .then((results) => {
            res.status(200).json({ subclasificaciones: results.recordset })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function changeStateSubClasificacion(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdSubClasificacion', sql.Int, data.IdSubClasificacion)
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit, +data.Habilitado)
    db.storedProcExecute('USP_DISP_SUBCLASIFICACION', aoj)
        .then((results) => {
            console.log(results)
            let afectadas = results.rowsAffected[0]
            let accion = (data.Habilitado == 0) ? 'Deshabilitada' : 'Habilitada';
            res.status(200).json((afectadas > 0) ? { success: 'SubClasificacion '  + accion + ' con exito!' } : { failed: 'No se encontro la SubClasificacion solicitada!' })
            console.log('SubClasificacion cambiada de estado con exito!')
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
            console.log('Error:', err)
        });
}
module.exports = {
    createSubclasificacion,
    getSubclasificacionById,
    getSubclasificaciones,
    updateSubclasificacion,
    getSubclasificacionesByIdClasificacion,
    changeStateSubClasificacion
}