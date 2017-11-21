var querys = require('../querys/rol')
var config = require('../config/mssqlConfig')

function createRol(req,res){ 
    var data = req.body
    console.log(((data.NombreRol != undefined) && (data.DescripcionRol != undefined)))
    if((data.NombreRol != undefined) && (data.DescripcionRol != undefined)){ 
      console.log('mandaste los campos')
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.createRol(poolObt,data)
        }).then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(err)
        })
    }else{
        res.status(401).send({
            error:true,
            code:'EPARAMS',
            message:'Para crear una rol envie correctamente los parametros!'
        })
    }
}
function getRoles(req,res){
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getRoles(poolObt);
    }).then((results) => {
        res.status(200).json({
            roles:results.recordset
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function getRolbyId(req,res){
    var IdCargo = req.params.IdCargo
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getRolById(poolObt,IdRol);
    }).then((results) => {
        res.status(200).json({
            rol:results.recordset
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function updateRol(req,res){
    var data = req.body
    if(data.IdRol != undefined && data.NombreRol != undefined && data.DescripcionRol != undefined){
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.updaterol(poolObt,data)
        }).then((results) => {
            res.status(200).json({
                success:'rol Actualizada Exitosamente!'
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