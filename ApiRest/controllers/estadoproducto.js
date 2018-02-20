const db   = require('../services/database');
const sql  = require('mssql');

function getEstados(req,res){
    var aoj = [];
    db.storedProcExecute('USP_GET_ESTADOSPRODUCTO', aoj)
    .then((results) => {
        res.status(200).json({estados:results.recordset})
    }).catch((err) => {
        res.status(500).json(err)
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
        res.status(500).json(err)
    })
}
module.exports={
    getEstadoById,
    getEstados
}