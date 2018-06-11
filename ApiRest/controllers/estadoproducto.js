const db   = require('../services/database');
const sql  = require('mssql');
const {mssqlErrors} = require('../Utils/util');
const {matchedData} = require('express-validator/filter');

function getEstados(req,res){
    let data = matchedData(req,{locations:['query']});
    let aoj = [];

    db.pushAOJParam(aoj,'Habilitado',sql.Int,+data.Habilitado)
    db.storedProcExecute('USP_GET_ESTADOSPRODUCTO', aoj)
    .then((results) => {
        res.status(200).json({estados:results.recordset})
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function getEstadoById(req,res){
    var IdEstado = req.params.IdEstado;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdEstado',sql.Int,IdEstado)
    db.storedProcExecute('USP_GET_ESTADOPRODUCTO_BY_ID', aoj)
    .then((results) => {
        res.status(200).json({ estado:results.recordset[0]})
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
module.exports={
    getEstadoById,
    getEstados
}