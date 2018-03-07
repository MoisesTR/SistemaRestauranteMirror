const { matchedData, sanitize } = require('express-validator/filter');
const sql = require('mssql');
const { mssqlErrors } = require('../Utils/util');
const db = require('../services/database');

function getProductoProveedorById(req, res) {
    const data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProductoProveedor', sql.Int, data.IdProductoProveedor);
    db.storedProcExecute('USP_GET_PRODUCTO_PROVEEDOR', aoj)
    .then((results) => {
        res.status(200).json({ producto: results.recordset[0] })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function getProveedoresOfProducto(req, res) {
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProductoProveedor', sql.Int, data.IdProductoProveedor);
    db.storedProcExecute('USP_GET_PRODUCTO_PROVEEDOR', aoj)
    .then((results) => {
        res.status(200).json({ productos: results.recordset })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));;
    })
}

function getProductosProveedores(req, res) {
    let Habilitado = req.query.Habilitado;
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, Habilitado)
    db.storedProcExecute('USP_GET_PRODUCTOS_PROVEEDORES', aoj)
    .then((results) => {
        res.status(200).json({ productos: results.recordset })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function createProductoProveedor(req, res) {
    var data = matchedData(req, { locations: 'body' });
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProducto', sql.Int, data.IdProducto)
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int, data.IdProveedor)
    db.pushAOJParam(aoj, 'IdEnvase', sql.Int, data.IdEnvase)
    db.pushAOJParam(aoj, 'IdEmpaque', sql.Int, data.IdEmpaque)
    db.pushAOJParam(aoj, 'Costo', sql.Float, data.Costo)
    db.pushAOJParam(aoj, 'CantidadEmpaque', sql.Int, data.CantidadEmpaque)
    db.pushAOJParam(aoj, 'IdUnidadMedida', sql.Int, data.IdUnidadMedida)
    db.pushAOJParam(aoj, 'ValorUnidadMedida', sql.Float, data.ValorUnidadMedida)
    db.pushAOJParam(aoj, 'DiasCaducidad', sql.Int, data.DiasCaducidad)
    db.storedProcExecute('USP_CREATE_PRODUCTO_PROVEEDOR', aoj)
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function getProductosByProveedorId(req, res) {
    var IdProductoProveedor = req.body.IdProductoProveedor;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int, IdProductoProveedor);
    db.storedProcExecute('USP_GET_PRODUCTOS_PROVEEDOR', aoj)
    .then((results) => {
        res.status(200).json({ productos: results.recordset })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));;
    })
}

function updateProducto(req, res) {
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProductoProveedor', sql.Int, data.IdProducto)
    db.pushAOJParam(aoj, 'IdEnvase', sql.Int, data.IdEnvase)
    db.pushAOJParam(aoj, 'IdEmpaque', sql.Int, data.IdEmpaque)
    db.pushAOJParam(aoj, 'Costo', sql.Float, data.Costo)
    db.pushAOJParam(aoj, 'CantidadEmpaque', sql.Int, data.CantidadEmpaque)
    db.pushAOJParam(aoj, 'IdUnidadMedida', sql.Int, data.IdUnidadMedida)
    db.pushAOJParam(aoj, 'ValorUnidadMedida', sql.Float, data.ValorUnidadMedida)
    db.storedProcExecute('USP_UPDATE_PRODUCTO', aoj)
        .then((results) => {
            res.status(200).json({
                success: 'Producto Actualizado exitosamente!!'
            })
            console.log('Producto Actualizado con exito!');
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function changeStateProductoProveedor(req, res) {
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProductoProveedor', sql.Int, data.IdProductoProveedor)
    db.storedProcExecute('USP_DISP_PRODUCTO_PROVEEDOR', aoj)
    .then((results) => {
        res.status(200).json(results)
        console.log('Producto cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function changeStateProducoPro(req, res) {

}
module.exports = {
    createProductoProveedor,
    changeStateProductoProveedor,
    getProductosProveedores,
    getProductoProveedorById,
    getProveedoresOfProducto,
    getProductosByProveedorId
}