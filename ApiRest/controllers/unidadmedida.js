const db  = require('../services/database');
const sql = require('mssql');
const { mssqlErrors } =  require('../Utils/util');
const {matchedData} = require('express-validator/filter');

function getUnidadById(req,res){
    const data = req.params;
    var aoj  = [];
    db.pushAOJParam(aoj, 'IdUnidadMedida',sql.Int,data.IdUnidadMedida)
    db.storedProcExecute('USP_GET_UNIDAD_DE_MEDIDA', aoj)
    .then((results) => {
        res.status(200).json({unidadmedida:results.recordset[0]}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function getUnidadesMedida(req,res){
    let data    = matchedData(req, {locations:['query']})
    var aoj = [];

    db.pushAOJParam(aoj, 'Habilitado', sql.Bit, +data.Habilitado)
    db.storedProcExecute('USP_GET_UNIDADES_DE_MEDIDA', aoj) 
    .then((results) => {
        res.status(200).json({unidadesmedida:results.recordset}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function createUnidadMedida(req,res){
    const data = matchedData(req);
    var aoj = [];
    db.pushAOJParam(aoj, 'IdClasificacionUnidadMedida',sql.Int,data.IdClasificacionUnidadMedida)
    db.pushAOJParam(aoj, 'NombreUnidad',sql.NVarChar(50),data.NombreUnidad)
    db.pushAOJParam(aoj, 'Simbolo',sql.NVarChar(3),data.Simbolo);
    db.pushAOJParam(aoj, 'NImportancia', sql.Int, data.NImportancia);
    db.storedProcExecute('dbo.USP_CREATE_UNIDAD_MEDIDA', aoj)
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function updateUnidadMedida(req,res){
    const data = matchedData(req);
    var aoj = [];
    db.pushAOJParam(aoj, 'IdUnidadMedida',          sql.Int,        data.IdUnidadMedida)
    db.pushAOJParam(aoj, 'IdClasificacionUnidadMedida',sql.Int,     data.IdClasificacionUnidadMedida)
    db.pushAOJParam(aoj, 'NombreUnidad',            sql.NVarChar(50),data.NombreUnidad)
    db.pushAOJParam(aoj, 'Simbolo',                 sql.NVarChar(3),data.Simbolo);
    db.pushAOJParam(aoj, 'NImportancia',            sql.Int,        data.NImportancia);
    db.storedProcExecute('dbo.USP_UPDATE_UNIDAD_MEDIDA', aoj)
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json((afectadas > 0) ? { success: 'Unidad de Medida actualizada con exito!' } : { failed: 'No se encontro actualizo la unidad de medida solicitado!' })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function changeStateUnidadMedida(req,res){
    let data = matchedData(req, {locations:['query','params','body']});
    var aoj  = [];
    db.pushAOJParam(aoj, 'IdUnidadMedida', sql.Int, data.IdUnidadMedida)
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit, +data.Habilitado)
    db.storedProcExecute('dbo.USP_DISP_UNIDAD_MEDIDA', aoj)
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0];
        let accion = (data.Habilitado == false) ? 'Deshabilitada' : 'Habilitada';
        res.status(200).json((afectadas > 0) ? { success: 'Unidad de Medida ' + accion + ' con exito!' } : { failed: 'No se encontro la unidad de medida solicitada!' })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports={
    createUnidadMedida,
    getUnidadById,
    getUnidadesMedida,
    updateUnidadMedida,
    changeStateUnidadMedida
}