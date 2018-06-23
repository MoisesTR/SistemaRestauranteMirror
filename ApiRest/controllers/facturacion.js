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
    db.pushAOJParam(aoj, 'NombVendedor', sql.NVarChar(100),data.NombVendedor);
    db.pushAOJParam(aoj, 'FechaIngreso', sql.SmallDateTime(),data.FechaIngreso);
    db.pushAOJParam(aoj, 'SubTotal', sql.Numeric(7,3),data.SubTotal);
    db.pushAOJParam(aoj, 'TotalIva', sql.Numeric(7,3),data.TotalIva);
    db.pushAOJParam(aoj, 'CambioActual', sql.Numeric(7,3),data.CambioActual);
    db.pushAOJParam(aoj, 'TotalDescuento', sql.Numeric(7,3),data.TotalDescuento);
    db.pushAOJParam(aoj, 'TotalCordobas', sql.Numeric(7,3),data.TotalCordobas);
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
    db.pushAOJParam(aoj, 'PrecioUnitario', sql.Numeric(7,3),data.PrecioUnitario);
    db.pushAOJParam(aoj, 'Cantidad', sql.Int,data.Cantidad);
    db.pushAOJParam(aoj, 'GravadoIva', sql.Bit,data.GravadoIva);
    db.pushAOJParam(aoj, 'SubTotal', sql.Numeric(7,3),data.SubTotal);
    db.pushAOJParam(aoj, 'Iva', sql.Numeric(7,3),data.Iva);
    db.pushAOJParam(aoj, 'Descuento', sql.Numeric(7,3),data.Descuento);
    db.pushAOJParam(aoj, 'TotalDetalle', sql.Numeric(7,3),data.TotalDetalle);
    db.pushAOJParam(aoj, 'Bonificacion', sql.Bit,data.Bonificacion);
    db.storedProcExecute('USP_CREATE_DETALLE_FACTURA_COMPRA',aoj)
    .then((result) => {
        res.status(200).json({IdDetalle: result.output.IdDetalle})
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}

function obtenerFacturasCompra(req, res ) {
    let aoj = [];
    let data = matchedData(req);
    db.pushAOJParam(aoj, 'FechaInicio', sql.SmallDateTime,data.FechaInicio);
    db.pushAOJParam(aoj, 'FechaFin', sql.SmallDateTime,data.FechaFin);
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int,data.IdProveedor);
    db.pushAOJParam(aoj, 'IdEstadoFactura', sql.Int,data.IdEstadoFactura);
    db.storedProcExecute('USP_GET_FACTURAS_COMPRA',aoj)
    .then((result) => {
        res.status(200).json(result.recordset[0])
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}

module.exports = {
    createFacturaCompra, 
    createDetalleFacturaCompra,
    obtenerFacturasCompra
}
