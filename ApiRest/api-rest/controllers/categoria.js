var querys = require('../querys/categoria')
var config = require('../config/mssqlConfig')

function createCategoria(req,res){ 
    var data = req.body
    if(data.Nombre != null && data.Descripcion != null){ 
      console.log('mandaste los campos')
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.createCategoria(poolObt,data)
        }).then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(err)
        })
    }else{
        res.status(401).send({
            error:true,
            code:'EPARAMS',
            message:'Para crear una categoria envie correctamente los parametros!'
        })
    }
}
function getCategorias(req,res){
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getCategorias(poolObt);
    }).then((results) => {
        res.status(200).json({
            categorias:results.recordset
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function updateCategoria(req,res){
    var data = req.body
    if(data.IdCategoria != undefined && data.Nombre != undefined && data.Descripcion != undefined){
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.updateCategoria(poolObt,data)
        }).then((results) => {
            res.status(200).json({
                success:'Categoria Actualizada Exitosamente!'
            })
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
function getCategoriaById(req,res){
    var data = req.params
    if(data.IdCategoria){
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getCategoriaById(poolObt,data.IdCategoria)
        }).then((results) => {
           res.status(200).json({categoria:results.recordset[0]}) 
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