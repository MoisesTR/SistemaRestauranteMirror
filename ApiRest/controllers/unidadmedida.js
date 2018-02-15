var querys = require('../querys/unidadmedida')
var config = require('../config/mssqlConfig')

function getUnidadById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getUnidadMedida(poolObt,data.IdUnidadMedida)
        }).then((results) => {
           res.status(200).json({unidadmedida:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getUnidadesMedida(req,res){
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getUnidades(poolObt)
        }).then((results) => {
           res.status(200).json({unidadesmedida:results.recordset}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function createUnidadMedida(req,res){
    var data = req.body;
    if(data.IdClasificacionUnidadMedida != null && data.NombreUnidad != null && data.Simbolo != null)
    {
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.createUnidadMedida(poolObt,data)
        }).then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(err)
        })
    }else{
        res.status(401).send({
            error:true,
            code:'EPARAMS',
            message:'Para Ingresar la unidad de medida envie correctamente los parametros!'
        })
    }
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