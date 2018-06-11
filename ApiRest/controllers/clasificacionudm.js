const {mssqlErrors} =  require('../Utils/util');
const db = require('../services/database');
const sql = require('mssql')
const {matchedData} = require('express-validator/filter');

function getClasificacionesUdm(req,res){
    let data = matchedData(req,{locations:['query']});
    var aoj = [];
    db.pushAOJParam(aoj,'Habilitado',sql.Int,+data.Habilitado)
    db.storedProcExecute('USP_GET_CLASIFICACIONES_UDM',aoj).then((results) => {
        res.status(200).json({
            clasificaciones:results.recordset
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}

function getClasificacionUdmById(req,res){
    var data = req.params;
    var aoj=[];
    db.pushAOJParam(aoj,'IdClasificacionUnidadMedida',sql.Int,data.IdClasificacionUnidadMedida)
    db.storedProcExecute('USP_GET_CLASIFICACION_UDM',aoj)
    .then((results) => {
        res.status(200).json({clasificacion:results.recordset[0]}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}

module.exports={
   getClasificacionesUdm,
   getClasificacionUdmById
}
