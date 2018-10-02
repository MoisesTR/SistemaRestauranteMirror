var fs                  = require('fs');
var path                = require('path');
var sql                 = require('mssql');
var db                  = require('../services/database');
const { mssqlErrors }   = require('../Utils/util');
const {matchedData}     = require('express-validator/filter')

function getProductoById(req, res) {
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProducto',      sql.Int, data.IdProducto)
    db.storedProcExecute('dbo.USP_GET_PRODUCTO', aoj)
        .then((results) => {
            var jsonString = results.recordset[0];
            jsonString = JSON.parse(jsonString['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
            res.status(200).json(jsonString);
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getProductos(req, res) {
    let data = matchedData(req,{locations:['query']});
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado)
    db.storedProcExecute('USP_GET_PRODUCTOS', aoj)
        .then((results) => {
            res.status(200).json({
                productos: results.recordset
            });
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function createProducto(req, res) {
    var data = matchedData(req, {locations:['body']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int,     data.IdProveedor)
    db.pushAOJParam(aoj, 'IdSubClasificacion', sql.Int,     data.IdSubClasificacion)
    db.pushAOJParam(aoj, 'IdEstado',        sql.Int,        data.IdEstado)
    db.pushAOJParam(aoj, 'NombreProducto',  sql.NVarChar(50), data.NombreProducto)
    db.pushAOJParam(aoj, 'Descripcion',     sql.NVarChar(200), data.Descripcion)
    db.pushAOJParam(aoj, 'Imagen',          sql.NVarChar(100), data.Imagen);
    db.pushAOJParam(aoj, 'IdEnvase',        sql.Int,        data.IdEnvase);
    db.pushAOJParam(aoj, 'IdEmpaque',       sql.Int,        data.IdEmpaque);
    db.pushAOJParam(aoj, 'IdUnidadMedida',  sql.Int,        data.IdUnidadMedida);
    db.pushAOJParam(aoj, 'ValorUnidadMedida', sql.Numeric(10, 5), data.ValorUnidadMedida)
    db.pushAOJParam(aoj, 'CantidadEmpaque', sql.Int, data.CantidadEmpaque);
    db.pushAOJParam(aoj, 'DiasRotacion',   sql.Int, data.DiasRotacion);
    db.pushAOJParam(aoj, 'TipoInsumo',   sql.Int, data.TipoInsumo);
    db.pushAOJParam(aoj, 'CodigoProducto',   sql.NVarChar(200), data.CodigoProducto);
    db.pushAOJParam(aoj, 'CodigoInterno',   sql.NVarChar(200), data.CodigoInterno);
    db.pushAOJParam(aoj, 'CodigoBarra',   sql.NVarChar(200), data.CodigoBarra);
    db.storedProcExecute('dbo.USP_CREATE_PRODUCTO', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function updateProducto(req, res) {
    var data = matchedData(req,{locations: ['body', 'params']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int,     data.IdProveedor)
    db.pushAOJParam(aoj, 'IdProducto', sql.Int, data.IdProducto)
    db.pushAOJParam(aoj, 'IdCategoria', sql.Int, data.IdCategoria)
    db.pushAOJParam(aoj, 'IdSubClasificacion', sql.Int, data.IdSubClasificacion)
    db.pushAOJParam(aoj, 'IdEstado', sql.Int, data.IdEstado)
    db.pushAOJParam(aoj, 'NombreProducto', sql.NVarChar(50), data.NombreProducto)
    db.pushAOJParam(aoj, 'Descripcion', sql.NVarChar(200), data.Descripcion)
    db.pushAOJParam(aoj, 'Imagen', sql.NVarChar(100), data.Imagen)
    db.pushAOJParam(aoj, 'IdEnvase',        sql.Int, data.IdEnvase);
    db.pushAOJParam(aoj, 'IdEmpaque',       sql.Int, data.IdEmpaque);
    db.pushAOJParam(aoj, 'IdUnidadMedida',  sql.Int, data.IdUnidadMedida);
    db.pushAOJParam(aoj, 'ValorUnidadMedida', sql.Numeric(10, 5), data.ValorUnidadMedida);
    db.pushAOJParam(aoj, 'CantidadEmpaque',   sql.Int, data.CantidadEmpaque);
    db.pushAOJParam(aoj, 'DiasRotacion',   sql.Int, data.DiasCaducidad);
    db.pushAOJParam(aoj, 'TipoInsumo',   sql.Int, data.TipoInsumo);
    db.pushAOJParam(aoj, 'CodigoProducto',   sql.NVarChar(200), data.CodigoProducto);
    db.pushAOJParam(aoj, 'CodigoInterno',   sql.NVarChar(200), data.CodigoInterno);
    db.pushAOJParam(aoj, 'CodigoBarra',   sql.NVarChar(200), data.CodigoBarra);
    db.storedProcExecute('USP_UPDATE_PRODUCTO', aoj)
        .then((results) => {
            console.dir(results)
            res.status(200).json({
                success: 'Producto Actualizado exitosamente!!'
            });
            console.log('Producto Actualizado con exito!')
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function changeStateProducto(req, res) {
    let data = matchedData(req,{locations:['params','query','body']});
    console.log('Changing state')
    console.log(data.IdProducto + ' ! ', data.Habilitado)
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProducto', sql.Int(), data.IdProducto)
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit(), +data.Habilitado)
    db.storedProcExecute('USP_DISP_PRODUCTO', aoj)
        .then((results) => {
            console.log(results)
            let afectadas = results.rowsAffected[0]
            let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
            res.status(200).json((afectadas > 0) ? { success: 'Producto ' + accion + ' con exito!' } : { failed: 'No se encontro el producto solicitado!' })
            console.log('Producto cambiado de estado con exito!')
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
            console.log('Error:', err)
        });
}

module.exports = {
    createProducto,
    getProductoById,
    getProductos,
    updateProducto,
    changeStateProducto
}