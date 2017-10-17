var querys = require('../querys/clasificacion')
var config = require('../config/mssqlConfig')

function createClasificacion(req,res){ 
    var data = req.body
    if(data.Nombre != undefined && data.Descripcion != undefined){ 
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.createClasificacion(poolObt,data);
        }).then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(err)
        })
    }
}
function getClasificaciones(req,res){
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getClasificaciones(poolObt);
    }).then((results) => {
        res.status(200).json({
            clasificaciones:results.recordset,
            cantidad:results.rowsAffected
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
           res.status(200).json(results) 
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
   createClasificacion,
   getClasificacionById,
   getClasificaciones,
   updateClasificacion
}
