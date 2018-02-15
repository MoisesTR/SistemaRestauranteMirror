var querys = require('../querys/cargo')
var config = require('../config/mssqlConfig')
var database = require('../services/database')
var sql = require('mssql')
const { matchedData, sanitize } = require('express-validator/filter');

function createEntradaBodegaAp(req,res){ 
    var data = matchedData(req,{locations:'body'})
    console.log('mandaste los campos')
    var aoj = [];
    database.pushAOJParam(aoj,'IdBodegaAreap',sql.Int,data.IdBodegaAreaP);
    database.pushAOJParam(aoj,'IdTrabajador',sql.Int,data.IdTrabajador);
    database.pushAOJParam(aoj,'IdProveedor',sql.Int,data.IdProveedor);
    //database.pushAOJParam(IdEstadoEdicicion,sql.,);
    database.pushAOJParam(aoj,'NFactura',sql.NVarChar(20),data.NFactura);
    database.pushAOJParam(aoj,'RepresentanteProveedor',sql.NVarChar(50),data.RepresentanteProveedor);
    database.pushAOJParam(aoj,'PorcRetencion',sql.Int,data.PorcRetencion);
    database.pushAOJParam(aoj,'PorcIva',sql.Int,data.PorcIva);
    database.pushAOJParam(aoj,'PorcDescuento',sql.Int,data.PorcDescuento);
    database.pushAOJParam(aoj,'FechaHora',sql.Date,data.FechaHora);
    database.storedProcExecute('USP_INSERT_ENTRADA_BODEGA_AREA_PRODUCCION',aoj).then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json(err)
    })
}
function createDetalleEntrada(req,res){ 
    var data = matchedData(req,{locations:'body'})
    console.log('mandaste los campos')
    var aoj = [];
    database.pushAOJParam(aoj,'IdEntradaBodegaAP',sql.Int,data.IdEntradaBodegaAP);
    database.pushAOJParam(aoj,'IdProductoProveedor',sql.Int,data.IdProductoProveedor);
    database.pushAOJParam(aoj,'Cantidad',sql.Int,data.Cantidad);
    //database.pushAOJParam(IdEstadoEdicicion,sql.,);
    database.pushAOJParam(aoj,'PrecioUnitarioEntrada',sql.Money,data.PrecioUnitarioEntrada);
    database.pushAOJParam(aoj,'DescuentoCalculado',sql.Money,data.DescuentoCalculado);
    database.storedProcExecute('USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION',aoj).then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json(err)
    })
}

function getDetalleBodegaAp(req,res){
    let Habilitado = req.query.Habilitado;
    let aoj=[];
    database.pushAOJParam(aoj,'IdBodegaAreaP',sql.Int,1);
    database.storedProcExecute('USP_GET_DETALLE_BODEGA_AP',aoj).then((results) => {
        res.status(200).json({
            detalles:results.recordset
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function generarFactura(req,res){
    var data = matchedData(req,{locations:'params'})
    let aoj =[];
    database.pushAOJParam(aoj,'IdEntradaBodegaAP',data.IdEntradaBodegaAP)
    database.storedProcExecute('USP_GENERAR_FACTURA',aoj).then((result) => {
        res.status(200).json({success:'Factura generada con exito!'})    
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
   createEntradaBodegaAp,
   getDetalleBodegaAp,
   generarFactura,
   createDetalleEntrada
}