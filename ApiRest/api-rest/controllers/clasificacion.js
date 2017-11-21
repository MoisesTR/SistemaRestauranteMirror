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
function changeStateProducto(req,res){
    var data = req.body
    config.getConnectionPoolGlobal()-then((poolObt) => {
        return querys.changeStateProducto(poolObt,IdProducto)        
    }).then((results) => {
        res.status(200).json(results)
        console.log('Producto cambiado de estado con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
module.exports={
   createClasificacion,
   getClasificacionById,
   getClasificaciones,
   updateClasificacion
}
