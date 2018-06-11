var config = require('../config/mssqlConfig')
var db = require('../services/database')
var sql = require('mssql')
const { mssqlErrors } = require('../Utils/util');
const { matchedData, sanitize } = require('express-validator/filter');

function createEntradaBodegaAp(req,res){ 
    var data = matchedData(req,{locations:'body'})
    console.log('mandaste los campos')
    var aoj = [];
    db.pushAOJParam(aoj,'IdBodegaAreap',sql.Int,data.IdBodegaAreaP);
    db.pushAOJParam(aoj,'IdTrabajador',sql.Int,data.IdTrabajador);
    db.pushAOJParam(aoj,'IdProveedor',sql.Int,data.IdProveedor);
    //db.pushAOJParam(IdEstadoEdicicion,sql.,);
    db.pushAOJParam(aoj,'NFactura',sql.NVarChar(20),data.NFactura);
    db.pushAOJParam(aoj,'RepresentanteProveedor',sql.NVarChar(50),data.RepresentanteProveedor);
    db.pushAOJParam(aoj,'PorcRetencion',sql.Int,data.PorcRetencion);
    db.pushAOJParam(aoj,'PorcIva',sql.Int,data.PorcIva);
    db.pushAOJParam(aoj,'PorcDescuento',sql.Int,data.PorcDescuento);
    db.pushAOJParam(aoj,'FechaHora',sql.Date,data.FechaHora);
    db.storedProcExecute('USP_INSERT_ENTRADA_BODEGA_AREA_PRODUCCION',aoj)
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function createDetalleEntrada(req,res){ 
    var data = matchedData(req,{locations:'body'})
    console.log('mandaste los campos')
    var aoj = [];
    db.pushAOJParam(aoj,'IdEntradaBodegaAP',sql.Int,data.IdEntradaBodegaAP);
    db.pushAOJParam(aoj,'IdProductoProveedor',sql.Int,data.IdProductoProveedor);
    db.pushAOJParam(aoj,'Cantidad',sql.Int,data.Cantidad);
    //db.pushAOJParam(IdEstadoEdicicion,sql.,);
    db.pushAOJParam(aoj,'PrecioUnitarioEntrada',sql.Money,data.PrecioUnitarioEntrada);
    db.pushAOJParam(aoj,'DescuentoCalculado',sql.Money,data.DescuentoCalculado);
    db.storedProcExecute('USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION',aoj)
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}

function getDetalleBodegaAp(req,res){
    let Habilitado = req.query.Habilitado;
    let aoj=[];
    db.pushAOJParam(aoj,'IdBodegaAreaP',sql.Int,1);
    db.storedProcExecute('USP_GET_DETALLE_BODEGA_AP',aoj)
    .then((results) => {
        res.status(200).json({
            detalles:results.recordset
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function generarFactura(req,res){
    var data = matchedData(req,{locations:'params'})
    let aoj =[];
    db.pushAOJParam(aoj,'IdEntradaBodegaAP',data.IdEntradaBodegaAP)
    db.storedProcExecute('USP_GENERAR_FACTURA',aoj).then((result) => {
        res.status(200).json({success:'Factura generada con exito!'})    
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
module.exports={
   createEntradaBodegaAp,
   getDetalleBodegaAp,
   generarFactura,
   createDetalleEntrada
}