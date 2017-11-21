var querys = require('../querys/cargo')
var config = require('../config/mssqlConfig')
var database = require('../services/database')
var sql = require('mssql')

function createCargo(req,res){ 
    var data = req.body
    console.log(((data.Nombre != undefined) && (data.Descripcion != undefined)))
    if((data.Nombre != undefined) && (data.Descripcion != undefined)){ 
      console.log('mandaste los campos')
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.createCargo(poolObt,data)
        }).then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(err)
        })
    }else{
        res.status(401).send({
            error:true,
            code:'EPARAMS',
            message:'Para crear un cargo envie correctamente los parametros!'
        })
    }
}
function getCargos(req,res){
    let Habilitado = req.query.Habilitado;
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getCargos(poolObt,Habilitado);
    }).then((results) => {
        res.status(200).json({
            cargos:results.recordset
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function updateCargo(req,res){
    var data = req.body
    if(data.IdCargo != undefined && data.NombreCargo != undefined && data.Descripcion != undefined){
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.updateCargo(poolObt,data)
        }).then((results) => {
            res.status(200).json({
                success:'Cargo Actualizado Exitosamente!'
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
function getCargoById(req,res){
    var data = req.params
    if(data.IdCargo){
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getCargoById(poolObt,data.IdCargo)
        }).then((results) => {
           res.status(200).json({cargo:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
    }else{
        res.status(401).json({
            error:true,
            code:'EPARAMS',
            message:'Envie el id de la Cargo a Obtener'
        })
    }
}
function changeStateCargo(req,res){
    let IdCargo= req.params.IdCargo
    let Habilitado = req.body.Habilitado
    console.log('IdCargo:'+IdCargo,'Habilitado:'+Habilitado)
    var aoj=[];
    database.pushAOJParam(aoj,'IdCargo',sql.Int,IdCargo)
    database.pushAOJParam(aoj,'Habilitado',sql.Int,Habilitado)
    database.storedProcExecute('USP_DISP_CARGO',aoj).then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? {success:'Cargo '+accion+' con exito!'} :{failed:'No se encontro el producto solicitado!'})
        console.log('Cargo cambiado de estado con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
       console.log('Error:',err)
    });
}
module.exports={
    createCargo,
    getCargoById,
    getCargos,
    updateCargo,
    changeStateCargo
}