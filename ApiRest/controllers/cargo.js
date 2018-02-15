const config = require('../config/mssqlConfig');
const db = require('../services/database');
const sql = require('mssql');

function createCargo(req,res){ 
    var data = req.body
    console.log(((data.NombreCargo != undefined) && (data.DescripcionCargo != undefined)))
    db.pushAOJParam(aoj, 'NombreCargo',sql.NVarChar(50),data.NombreCargo)
    db.pushAOJParam(aoj, 'DescripcionCargo',sql.NVarChar(100),data.DescripcionCargo)
    .execute('USP_CREATE_CARGO')
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.createCargo(poolObt,data)
        }).then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(err)
        })
}
function getCargos(req,res){
    let Habilitado = req.query.Habilitado;
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_CARGOS');
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
    var data = req.body;
    db.pushAOJParam(aoj, 'IdCargo',sql.Int,data.IdCargo)
        db.pushAOJParam(aoj, 'NombreCargo',sql.NVarChar(50),data.NombreCargo)
        db.pushAOJParam(aoj, 'DescripcionCargo',sql.NVarChar(100),data.DescripcionCargo)
        .execute('USP_UPDATE_CARGO')
    config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.updateCargo(poolObt,data)
        }).then((results) => {
            res.status(200).json({
                success:'Cargo Actualizado Exitosamente!'
            })
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getCargoById(req,res){
    var data = req.params;
    db.pushAOJParam(aoj, 'IdCargo',sql.Int,IdCargo)
        .execute('USP_GET_CARGO')
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getCargoById(poolObt,data.IdCargo)
        }).then((results) => {
           res.status(200).json({cargo:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
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