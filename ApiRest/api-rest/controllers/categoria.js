var querys = require('../querys/categoria')
var config = require('../config/mssqlConfig')

function createCategoria(req,res){ 
    var data = req.body
    if(data.Nombre != undefined && data.Descripcion != undefined){ 
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.createCategoria(poolObt,data);
        }).catch((err) => {
            
        })
    }
}
function getCategorias(req,res){
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getCategorias(poolObt);
    }).then((results) => {
        
    }).catch((err) => {
        
    });
}
function updateCategoria(req,res){
    var data = req.body
    if(data.IdCategoria != undefined && data.Nombre != undefined && data.Descripcion != undefined){
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.updateCategoria(poolObt,data)
        }).then((results) => {
            
        }).catch((err) => {
            
        });
    }else{
        res.status(401).send({
            error:true,
            code:'EPARAMS',
            message:'Para actualizar envie correctamente los parametros!'
        })
    }
}
function getCategoriaById(req,res){
    var data = req.params
    if(data.IdCategoria){
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getCategoriaById(poolObt,data.IdCategoria)
        }).then((results) => {
           res.status(200).json(results) 
        }).catch((err) => {
            res.status(500).json(err)
        });
    }else{
        res.status(401).json({
            error:true,
            code:'EPARAMS',
            message:'Envie el id de la Categoria a Obtener'
        })
    }
}
module.exports={
    createCategoria,
    getCategoriaById,
    getCategorias,
    updateCategoria
}