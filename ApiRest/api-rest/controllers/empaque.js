var querys = require('../querys/empaque')
var config = require('../config/mssqlConfig')

function getEmpaqueById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getEmpaque(poolObt,data.IdEmpaque)
        }).then((results) => {
           res.status(200).json({
               empaque:results.recordset[0],
               cantidad:results.rowsAffected[0]
           }) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getEmpaques(req,res){
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getEmpaques(poolObt)
    }).then((results) => {
       res.status(200).json({
           empaques:resulsts.recordset,
           cantidad:results.rowsAffected[0]
       }) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createEmpaque(req,res){
    var data = req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.createEmpaque(poolObt,data)
    }).then((results) => {
       res.status(200).json({
           message:'Empaque Creado con exito!!'
       }) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function updateEmpaque(req,res){
    var data = req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.updateEmpaque(poolObt,data)
    }).then((results) => {
       res.status(200).json({
           message:'Empaque Actualizado con exito!'
       }) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
module.exports={
    createEmpaque,
    getEmpaqueById,
    getEmpaques,
    updateEmpaque
}
