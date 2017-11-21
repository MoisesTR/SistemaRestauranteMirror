var querys = require('../querys/envase')
var config = require('../config/mssqlConfig')

function getEnvaseById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getEnvase(poolObt,data.IdEnvase)
        }).then((results) => {
           res.status(200).json({envase:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getEnvases(req,res){
    let Habilitado = req.query.Habilitado;
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getEnvases(poolObt,Habilitado)
    }).then((results) => {
       res.status(200).json({envases:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createEnvase(req,res){
    var data = req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.createEnvase(poolObt,data)
    }).then((results) => {
       res.status(200).json({
           message:'Envase Creado con exito!!'
       }) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}

module.exports={
    getEnvaseById,
    getEnvases,
    createEnvase
}