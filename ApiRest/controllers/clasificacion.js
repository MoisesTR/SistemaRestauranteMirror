const db = require('../services/database')
const sql = require('mssql');
const { mssqlErrors } = require('../Utils/util');
const {matchedData} = require('express-validator/filter');

function createClasificacion(req, res) {
    var data = matchedData(req, {locations:'body'});
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'IdCategoria', sql.Int, data.IdCategoria);
    db.pushAOJParam(aoj, 'NombreClasificacion', sql.NVarChar(50), data.NombreClasificacion);
    db.pushAOJParam(aoj, 'DescripcionClasificacion', sql.NVarChar(150), data.DescripcionClasificacion);
    db.storedProcExecute('USP_CREATE_CLASIFICACION', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        })
}

function getClasificaciones(req, res) {
    var data = matchedData(req,{locations: ['query']});
    var aoj = [];
    console.log(+data.Habilitado)
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit(), +data.Habilitado);
    console.log('Agrego el parametro')
    db.storedProcExecute('USP_GET_CLASIFICACIONES', aoj)
        .then((results) => {
            res.status(200).json({
                clasificaciones: results.recordset
            })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getClasificacionesByIdCategoria(req,res){
    var data = req.params;
    console.log(data);
    
    var aoj = [];
    db.pushAOJParam(aoj, 'IdCategoria',sql.Int, data.IdCategoria)
    db.pushAOJParam(aoj, 'Habilitado',sql.Int, data.Habilitado)
    db.storedProcExecute('USP_GET_CLASIFICACIONES_BY_ID_CATEGORIA', aoj)
    .then((results) => {
        res.status(200).json({
            clasificaciones:results.recordset
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}

function updateClasificacion(req, res) {
    var data = matchedData(req,{locations: ['body', 'params']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdClasificacion', sql.Int(), data.IdClasificacion)
    db.pushAOJParam(aoj, 'IdCategoria', sql.Int(), data.IdCategoria)
    db.pushAOJParam(aoj, 'NombreClasificacion', sql.NVarChar(50), data.NombreClasificacion)
    db.pushAOJParam(aoj, 'DescripcionClasificacion', sql.NVarChar(150), data.DescripcionClasificacion)
    db.storedProcExecute('USP_UPDATE_CLASIFICACION', aoj)
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json((afectadas > 0) ? { success: 'Clasificación modificada con exito!' } : { failed: 'No se encontro la Clasificación solicitada!' })
    
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function getClasificacionById(req, res) {
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdClasificacion', sql.Int, data.IdClasificacion);
    db.storedProcExecute('USP_GET_CLASIFICACION', aoj)
        .then((results) => {
            res.status(200).json({ clasificacion: results.recordset[0] })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function changeStateClasificacion(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdClasificacion', sql.Int(), data.IdClasificacion);
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit(), +data.Habilitado);
    db.storedProcExecute('USP_DISP_CLASIFICACION', aoj)
        .then((results) => {
            console.log(results)
            let afectadas = results.rowsAffected[0]
            let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
            res.status(200).json((afectadas > 0) ? { success: 'Clasificacion ' + accion + ' con exito!' } : { failed: 'No se encontro la clasificacion solicitada!' })
            console.log('Clasificacion cambiado de estado con exito!')
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
            console.log('Error:', err)
        });
}
module.exports = {
    createClasificacion,
    getClasificacionById,
    getClasificacionesByIdCategoria,
    getClasificaciones,
    updateClasificacion,
    changeStateClasificacion
}