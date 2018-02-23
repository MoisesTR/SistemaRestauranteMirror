var sql = require('mssql');
var db = require('../services/database');
const mssqlErrors = require('../Utils/util');

function getEmpaqueById(req,res){
    const data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdEmpaque',sql.Int,IdEmpaque);
    db.queryExecute('SELECT IdEmpaque,NombreEmpaque,Descripcion,Habilitado FROM EMPAQUE WHERE IdEmpaque = @IdEmpaque', aoj)
    .then((results) => {
        res.status(200).json({empaque:results.recordset[0]}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function getEmpaques(req,res){
    let Habilitado = req.query.Habilitado;
    var  aoj = [];
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado);
    db.storedProcExecute('USP_GET_EMPAQUES', aoj)
    .then((results) => {
       res.status(200).json({empaques:results.recordset}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function createEmpaque(req,res){
    const data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'NombreEmpaque',sql.NVarChar(50),data.NombreEmpaque);
    db.pushAOJParam(aoj, 'Descripcion',sql.NVarChar(150),data.Descripcion);
    db.storedProcExecute('USP_CREATE_EMPAQUE', aoj)
    .then((results) => {
       res.status(200).json(results.recordset[0]) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function updateEmpaque(req,res){
    var data = req.body;
    var aoj = [];
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.updateEmpaque(poolObt,data)
    }).then((results) => {
       res.status(200).json({
           success:'Empaque Actualizado con exito!'
       }) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
module.exports={
    createEmpaque,
    getEmpaqueById,
    getEmpaques,
    updateEmpaque
}
