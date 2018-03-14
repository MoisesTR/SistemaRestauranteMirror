const db    = require('../services/database');
const sql   = require('mssql');
const {mssqlErrors} = require('../Utils/util');

function getEnvaseById(req,res){
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdEnvase',sql.Int,data.IdEnvase);
    db.queryExecute('SELECT IdEnvase,NombreEnvase,Descripcion,Habilitado FROM ENVASE where IdEnvase = @IdEnvase', aoj)
    .then((results) => {
        res.status(200).json({envase:results.recordset[0]}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function getEnvases(req,res){
    let Habilitado = req.query.Habilitado;
    console.log('Getting envases');
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado);
    db.storedProcExecute('USP_GET_ENVASES', aoj)
    .then((results) => {
       res.status(200).json({
           envases:results.recordset
        });
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );;
    });
}
function createEnvase(req,res){
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'NombreEnvase',sql.NVarChar(50),data.NombreEnvase)
    db.pushAOJParam(aoj, 'Descripcion',sql.NVarChar(150),data.Descripcion)
    db.storedProcExecute('USP_CREATE_ENVASE', aoj)
    .then((results) => {
        res.status(200).json(results.recordset[0]) 
    }).catch((err) => {
    
        res.status(500).json( mssqlErrors(err) );
    });
}

module.exports={
    getEnvaseById,
    getEnvases,
    createEnvase
}