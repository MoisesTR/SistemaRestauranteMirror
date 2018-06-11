let sql             = require('mssql');
let db              = require('../services/database');
let {matchedData}   = require('express-validator/filter');
let {mssqlErrors}   = require('../Utils/util');

function getTiposDocumento(req, res) {
    let data = matchedData(req, {locations:['query']});
    let aoj = [];
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit, +data.Habilitado);
    db.storedProcExecute('USP_GET_TIPOS_DOCUMENTOS_IDENTIFICACION', aoj)
        .then((results) => {
            res.status(200).json({ documentos: results.recordset })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}
function createTipoDocumento(req, res){
    let data = matchedData(req, {locations:['body']});
    let aoj = [];

    db.pushAOJParam(aoj, 'NombreTD', sql.NVarChar(50), data.NombreTD);
    db.pushAOJParam(aoj, 'DescripcionTD', sql.NVarChar(150), data.DescripcionTD)
    db.storedProcExecute('dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION', aoj )
    .then((results) => {
        res.status(200).json(results.recordset[0])
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}
function updateTipoDocumento(req, res){
    let data = matchedData(req, {locations:['body', 'params']});
    let aoj = [];

    db.pushAOJParam(aoj, 'IdTipoDocumento', sql.Int, data.IdTipoDocumento);
    db.pushAOJParam(aoj, 'NombreTD', sql.NVarChar(50), data.NombreTD);
    db.pushAOJParam(aoj, 'DescripcionTD', sql.NVarChar(150), data.DescripcionTD);
    db.storedProcExecute('dbo.USP_UPDATE_TIPO_DOCUMENTO_IDENTIFICACION', aoj )
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json((afectadas > 0) ? { success: 'Tipo de Documento modificado con exito!' } : { failed: 'No se encontro el Tipo de Documento solicitado!' })
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function changeStateTipoDocumento(req, res) {
    let data = matchedData(req, {locations:['query','params']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdTipoDocumento', sql.Int, data.IdTipoDocumento)
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit, +data.Habilitado)
    db.storedProcExecute('dbo.USP_DISP_TIPO_DOCUMENTO_IDENTIFICACION', aoj)
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? { success: 'Tipo de Documento '  + accion + ' con exito!' } : { failed: 'No se encontro el Tipo de Documento solicitado!' })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports = {
    createTipoDocumento,
    updateTipoDocumento,
    getTiposDocumento,
    changeStateTipoDocumento
}