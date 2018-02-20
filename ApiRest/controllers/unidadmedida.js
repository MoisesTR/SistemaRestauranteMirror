const db  = require('../services/database');
const sql = require('mssql');

function getUnidadById(req,res){
    const data = req.params;
    var aoj  = [];
    db.pushAOJParam(aoj, 'IdUnidadMedida',sql.Int,IdUnidadMedida)
    db.storedProcExecute('USP_GET_UNIDAD_DE_MEDIDA', aoj)
    .then((results) => {
        res.status(200).json({unidadmedida:results.recordset[0]}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function getUnidadesMedida(req,res){
    var aoj = [];
    db.storedProcExecute('USP_GET_UNIDADES_DE_MEDIDA', aoj) 
    .then((results) => {
        res.status(200).json({unidadesmedida:results.recordset}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function createUnidadMedida(req,res){
    const data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdClasificacionUnidadMedida',sql.Int,data.IdClasificacionUnidadMedida)
    db.pushAOJParam(aoj, 'NombreUnidad',sql.NVarChar(50),data.NombreUnidad)
    db.pushAOJParam(aoj, 'Simbolo',sql.NVarChar(3),data.Simbolo)
    db.storedProcExecute('USP_CREATE_UNIDAD_MEDIDA')
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function updateUDM(req,res){

}
function changeStateUnidadMedida(req,res){
    
}
module.exports={
    createUnidadMedida,
    getUnidadById,
    getUnidadesMedida,
    updateUDM,
    changeStateUnidadMedida
}