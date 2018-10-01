const { matchedData, sanitize } = require('express-validator/filter');
const { mssqlErrors } = require('../Utils/util');
const sql = require('mssql');
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
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProducto', sql.Int, data.IdProducto);
    db.storedProcExecute('USP_GET_PRODUCTO_PROVEEDORES', aoj)
    .then((results) => {
        res.status(200).json({ proveedores: results.recordset })
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
    var data = matchedData(req);
    var aoj = [];
    console.log(req.params);
    db.pushAOJParam(aoj, 'IdProducto', sql.Int, data.IdProducto)
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int, data.IdProveedor)
    db.storedProcExecute('USP_CREATE_PRODUCTO_PROVEEDOR', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            // console.log(err)
            res.status(500).json(mssqlErrors(err));
        });
}

function getProductosByProveedorId(req, res) {
    var data = req.params;
    var aoj = [];

    db.pushAOJParam(aoj, 'IdProveedor', sql.Int, data.IdProveedor);
    db.storedProcExecute('USP_GET_PRODUCTOS_PROVEEDOR', aoj)
        .then((results) => {
            res.status(200).json({ productos: results.recordset })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));;
        })
}

function getProductosByProveedorIdFiltrado(req, res) {
    var data = req.params;
    var aoj = [];

    db.pushAOJParam(aoj, 'IdProveedor', sql.Int, data.IdProveedor);
    db.pushAOJParam(aoj, 'IdFactura', sql.Int, data.IdFactura);
    db.storedProcExecute('[USP_GET_PRODUCTOS_PROVEEDOR_FILTRADOS]', aoj)
        .then((results) => {
            res.status(200).json({ productos: results.recordset })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));;
        })
}



function changeStateProductoProveedor(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});
    var aoj = [];
    console.log(data);
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int(), data.IdProductoProveedor);
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit(), +data.Habilitado);
    db.storedProcExecute('USP_DISP_PRODUCTO_PROVEEDOR', aoj)
        .then((results) => {
            let afectadas = results.rowsAffected[0];
            let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
            res.status(200).json((afectadas > 0) ? { success: 'Producto Proveedor ' + accion + ' con exito!' } : { failed: 'No existe relacion entre el producto y proveedor!' })
            console.log('Producto cambiado de estado con exito!')
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

module.exports = {
    createProductoProveedor,
    changeStateProductoProveedor,
    getProductosProveedores,
    getProductoProveedorById,
    getProveedoresOfProducto,
    getProductosByProveedorId,
    getProductosByProveedorIdFiltrado
}