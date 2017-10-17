var querys = require('../querys/subclasificacion')
var config = require('../config/mssqlConfig')

function getSubclasificacionById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getSubclasificacionById(poolObt,data.IdSubclasificacion)
        }).then((results) => {
           res.status(200).json({
               subclasificacion:results.recordset[0],
               cantidad:results.rowsAffected[0]
           }) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getSubclasificaciones(req,res){
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getSubclasificaciones(poolObt)
    }).then((results) => {
       res.status(200).json({
           subclasificaciones:resulsts.recordset,
           cantidad:results.rowsAffected[0]
       }) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createSubclasificacion(req,res){
    var data = req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.createSubClasificacion(poolObt,data)
    }).then((results) => {
       res.status(200).json({
           message:'Subclasificacion creada con exito!!'
       }) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function updateSubclasificacion(req,res){
    var data = req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.updateSubclasificacion(poolObt,data)
    }).then((results) => {
       res.status(200).json({
           message:'Subclasificacion Actualizada con exito!!'
       }) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
module.exports={
    createSubclasificacion,
    getSubclasificacionById,
    getSubclasificaciones,
    updateSubclasificacion
}