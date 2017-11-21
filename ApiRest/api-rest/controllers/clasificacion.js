var querys = require('../querys/clasificacion')
var config = require('../config/mssqlConfig')
var database = require('../services/database')
var sql = require('mssql')

function createClasificacion(req,res){ 
    var data = req.body
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.createClasificacion(poolObt,data);
        }).then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(err)
        })
}
function getClasificaciones(req,res){
    let Habilitado = req.query.Habilitado;
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getClasificaciones(poolObt,Habilitado);
    }).then((results) => {
        res.status(200).json({
            clasificaciones:results.recordset
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function updateClasificacion(req,res){
    var data = req.body
    if(data.IdClasificacion != undefined && data.Nombre != undefined && data.Descripcion != undefined){
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.updateClasificacion(poolObt,data)
        }).then((results) => {
            res.status(200).json({success:'Clasificacion actualizada con exito!'})
        }).catch((err) => {
            res.status(500).json(err)
        });
    }else{
        res.status(401).send({
            error:true,
            code:'EPARAMS',
            message:'Para actualizar envie correctamente los parametros!'
        })
    }
}
function getClasificacionById(req,res){
    var data = req.params
    if(data.IdClasificacion){
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getClasificacionById(poolObt,data.IdClasificacion)
        }).then((results) => {
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
function changeStateClasificacion(req,res){
    let IdClasificacion= req.params.IdClasificacion
    let Habilitado = req.body.Habilitado
    console.log('IdClasificacion:'+IdClasificacion,'Habilitado:'+Habilitado)
    var aoj=[];
    database.pushAOJParam(aoj,'IdClasificacion',sql.Int,IdClasificacion)
    database.pushAOJParam(aoj,'Habilitado',sql.Int,Habilitado)
    database.storedProcExecute('USP_DISP_CLASIFICACION',aoj).then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? {success:'Clasificacion '+accion+' con exito!'} :{failed:'No se encontro la clasificacion solicitada!'})
        console.log('Clasificacion cambiado de estado con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
       console.log('Error:',err)
    });
}
module.exports={
   createClasificacion,
   getClasificacionById,
   getClasificaciones,
   updateClasificacion,
   changeStateClasificacion
}
