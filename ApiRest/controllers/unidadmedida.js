var querys = require('../querys/unidadmedida')
var config = require('../config/mssqlConfig')

function getUnidadById(req,res){
    var data = req.params;
    .input('IdUnidadMedida',sql.Int,IdUnidadMedida)
        .execute('USP_GET_UNIDAD_DE_MEDIDA')
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getUnidadMedida(poolObt,data.IdUnidadMedida)
        }).then((results) => {
           res.status(200).json({unidadmedida:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getUnidadesMedida(req,res){
    .execute('USP_GET_UNIDADES_DE_MEDIDA')
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
    .input('IdClasificacionUnidadMedida',sql.Int,data.IdClasificacionUnidadMedida)
        .input('NombreUnidad',sql.NVarChar(50),data.NombreUnidad)
        .input('Simbolo',sql.NVarChar(3),data.Simbolo)
        .execute('USP_CREATE_UNIDAD_MEDIDA')
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