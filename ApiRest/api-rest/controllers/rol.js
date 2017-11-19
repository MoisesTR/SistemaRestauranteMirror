var querys = require('../querys/categoria')
var config = require('../config/mssqlConfig')

function createRol(req,res){ 
    var data = req.body
    console.log(((data.Nombre != undefined) && (data.Descripcion != undefined)))
    if((data.Nombre != undefined) && (data.Descripcion != undefined)){ 
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
function getRoles(req,res){
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
function getRolbyId(req,res){
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
function updateRol(req,res){
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

module.exports={
    createRol,
    getRoles,
    getRolbyId,
    updateRol
}