var querys = require('../querys/clasificacion')
var config = require('../config/mssqlConfig')
var database = require('../services/database')
var sql = require('mssql')

function getClasificacionesUdm(req,res){
    let Habilitado = req.query.Habilitado;
    var aoj = [];
    database.pushAOJParam(aoj,'Habilitado',sql.Int,Habilitado)
    database.storedProcExecute('USP_GET_CLASIFICACIONES_UDM',aoj).then((results) => {
        res.status(200).json({
            clasificaciones:results.recordset
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function getClasificacionUdmById(req,res){
    var data = req.params
    if(data.IdClasificacionUnidadMedida){
        var aoj=[];
        database.pushAOJParam(aoj,'IdClasificacionUnidadMedida',sql.Int,data.IdClasificacionUnidadMedida)
        database.storedProcExecute('USP_GET_CLASIFICACION_UDM',aoj).then((results) => {
           res.status(200).json({clasificacion:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
    }else{
        res.status(401).json({
            error:true,
            code:'EPARAMS',
            message:'Envie el id de la Clasificacion a Obtener'
        })
    }
}

module.exports={
   getClasificacionesUdm,
   getClasificacionUdmById
}
