const { matchedData, sanitize } = require('express-validator/filter');
let sql  = require('mssql');
let db = require('../services/database');
let {mssqlErrors } = require('../Utils/util');

function createFacturaCompra(req, res) {
    let data = matchedData(req);
    let aoj = [];
    db.pushAOJParam(aoj, 'NumRefFactura', sql.NVarChar(50),data.NumRefFactura);
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int,data.IdProveedor);
    db.pushAOJParam(aoj, 'IdTrabajador', sql.Int,data.IdTrabajador);
    db.pushAOJParam(aoj, 'IdTipoMoneda', sql.Int,data.IdTipoMoneda);
    db.pushAOJParam(aoj, 'IdFormaPago', sql.Int,data.IdFormaPago);
    db.pushAOJParam(aoj, 'NombVendedor', sql.NVarChar(100),data.NombVendedor);
    db.pushAOJParam(aoj, 'FechaFactura', sql.Date,data.FechaFactura);
    db.pushAOJParam(aoj, 'FechaRecepcion', sql.Date,data.FechaRecepcion);
    db.pushAOJParam(aoj, 'SubTotal', sql.Numeric(14,2),data.SubTotal);
    db.pushAOJParam(aoj, 'TotalIva', sql.Numeric(14,2),data.TotalIva);
    db.pushAOJParam(aoj, 'CambioActual', sql.Numeric(14,2),data.CambioActual);
    db.pushAOJParam(aoj, 'TotalDescuento', sql.Numeric(14,2),data.TotalDescuento);
    db.pushAOJParam(aoj, 'TotalCordobas', sql.Numeric(14,2),data.TotalCordobas);
    db.pushAOJParam(aoj, 'Retencion', sql.Bit,data.Retencion);
    db.pushOutParam(aoj, 'IdFactura', sql.Int);
    db.storedProcExecute('USP_CREATE_FACTURA_COMPRA',aoj)
    .then((result) => {
        res.status(200).json({IdFactura: result.output.IdFactura})
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}

function updateFacturaCompra(req, res) {
    let data = matchedData(req);
    let aoj = [];
    db.pushAOJParam(aoj, 'NumRefFactura', sql.NVarChar(50),data.NumRefFactura);
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int,data.IdProveedor);
    db.pushAOJParam(aoj, 'IdTrabajador', sql.Int,data.IdTrabajador);
    db.pushAOJParam(aoj, 'NombVendedor', sql.NVarChar(100),data.NombVendedor);
    db.pushAOJParam(aoj, 'FechaIngreso', sql.Date,data.FechaIngreso);
    db.pushAOJParam(aoj, 'SubTotal', sql.Numeric(14,2),data.SubTotal);
    db.pushAOJParam(aoj, 'TotalIva', sql.Numeric(14,2),data.TotalIva);
    db.pushAOJParam(aoj, 'CambioActual', sql.Numeric(14,2),data.CambioActual);
    db.pushAOJParam(aoj, 'TotalDescuento', sql.Numeric(14,2),data.TotalDescuento);
    db.pushAOJParam(aoj, 'TotalCordobas', sql.Numeric(14,2),data.TotalCordobas);
    db.pushAOJParam(aoj, 'Retencion', sql.Bit,data.Retencion);
    db.pushOutParam(aoj, 'IdFactura', sql.Int);
    db.storedProcExecute('USP_CREATE_FACTURA_COMPRA',aoj)
    .then((result) => {
        res.status(200).json({IdFactura: result.output.IdFactura})
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}


function createDetalleFacturaCompra(req, res) {
    let data = matchedData(req);
    let aoj = [];
    db.pushOutParam(aoj, 'IdDetalle', sql.Int);
    db.pushAOJParam(aoj, 'IdFactura', sql.Int,data.IdFactura);
    db.pushAOJParam(aoj, 'IdProducto', sql.Int,data.IdProducto);
    db.pushAOJParam(aoj, 'PrecioUnitario', sql.Numeric(14,2),data.PrecioUnitario);
    db.pushAOJParam(aoj, 'Cantidad', sql.Int,data.Cantidad);
    db.pushAOJParam(aoj, 'GravadoIva', sql.Bit,data.GravadoIva);
    db.pushAOJParam(aoj, 'SubTotal', sql.Numeric(14,2),data.SubTotal);
    db.pushAOJParam(aoj, 'Iva', sql.Numeric(14,2),data.Iva);
    db.pushAOJParam(aoj, 'Descuento', sql.Numeric(14,2),data.Descuento);
    db.pushAOJParam(aoj, 'TotalDetalle', sql.Numeric(14,2),data.TotalDetalle);
    db.pushAOJParam(aoj, 'Bonificacion', sql.Bit,data.Bonificacion);
    db.storedProcExecute('USP_CREATE_DETALLE_FACTURA_COMPRA',aoj)
    .then((result) => {
        res.status(200).json({IdDetalle: result.output.IdDetalle})
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}

function updateDetalleFacturaCompra(req, res) {
    let data = matchedData(req);
    let aoj = [];
    db.pushAOJParam(aoj, 'IdFactura', sql.Int,data.IdFactura);
    db.pushAOJParam(aoj, 'IdProducto', sql.Int,data.IdProducto);
    db.pushAOJParam(aoj, 'PrecioUnitario', sql.Numeric(14,2),data.PrecioUnitario);
    db.pushAOJParam(aoj, 'Cantidad', sql.Int,data.Cantidad);
    db.pushAOJParam(aoj, 'GravadoIva', sql.Bit,data.GravadoIva);
    db.pushAOJParam(aoj, 'SubTotal', sql.Numeric(14,2),data.SubTotal);
    db.pushAOJParam(aoj, 'Iva', sql.Numeric(14,2),data.Iva);
    db.pushAOJParam(aoj, 'Descuento', sql.Numeric(14,2),data.Descuento);
    db.pushAOJParam(aoj, 'TotalDetalle', sql.Numeric(14,2),data.TotalDetalle);
    db.pushAOJParam(aoj, 'Bonificacion', sql.Bit,data.Bonificacion);
    db.storedProcExecute('USP_CREATE_DETALLE_FACTURA_COMPRA',aoj)
    .then((result) => {
        res.status(200).json({IdDetalle: result.output.IdDetalle})
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}

function getFacturaById(req, res ) {
    let aoj = [];
    let data = matchedData(req,{locations:['params','query','body']});
    console.log(data);
    db.pushAOJParam(aoj, 'IdFactura', sql.Int,data.IdFactura);
    db.storedProcExecute('USP_GET_FACTURA_BY_ID',aoj)
    .then((result) => {
        var jsonString = result.recordset[0];
        jsonString = JSON.parse(jsonString['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        console.log(JSON.stringify(jsonString));
        res.status(200).json({factura:jsonString.Factura[0]})
    })
    .catch((err) =>  {
        console.log(err)
        res.status(500).json(mssqlErrors(err))
    })
}

function getCambiosFacturaById(req, res ) {
    let aoj = [];
    let data = matchedData(req,{locations:['params','query','body']});
    console.log(data);
    db.pushAOJParam(aoj, 'IdFactura', sql.Int,data.IdFactura);
    db.storedProcExecute('USP_GET_CAMBIOS_FACTURA_BY_ID',aoj)
    .then((result) => {
        res.status(200).json({cambios:result.recordset})
    })
    .catch((err) =>  {
        console.log(err)
        res.status(500).json(mssqlErrors(err))
    })
}


function obtenerFacturasCompra(req, res ) {
    let aoj = [];
    let data = matchedData(req,{locations:['params','query','body']});
    console.log(data);
    db.pushAOJParam(aoj, 'FechaInicio', sql.Date,data.FechaInicio);
    db.pushAOJParam(aoj, 'FechaFin', sql.Date,data.FechaFin);
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int,data.IdProveedor);
    db.pushAOJParam(aoj, 'IdEstadoFactura', sql.Int,data.IdEstadoFactura);
    db.storedProcExecute('USP_GET_FACTURAS_COMPRA',aoj)
    .then((result) => {
        res.status(200).json({facturas:result.recordset})
    })
    .catch((err) =>  {
        console.log(err)
        res.status(500).json(mssqlErrors(err))
    })
}

module.exports = {
    createFacturaCompra, 
    createDetalleFacturaCompra,
    getCambiosFacturaById,
    getFacturaById,
    updateFacturaCompra,
    updateDetalleFacturaCompra,
    obtenerFacturasCompra
    
}
