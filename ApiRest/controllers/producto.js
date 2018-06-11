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
            res.status(200).json({
                producto: results.recordset[0]
            });
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getProductos(req, res) {
    let Habilitado = req.query.Habilitado;
    (!Habilitado) ? console.log('sin query'): console.log('con query');
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, Habilitado)
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
    var data = req.body;
    var aoj = [];
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
    db.pushAOJParam(aoj, 'DiasCaducidad',   sql.Int, data.DiasCaducidad);
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
    db.pushAOJParam(aoj, 'IdProducto', sql.Int, data.IdProducto)
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
    db.pushAOJParam(aoj, 'DiasCaducidad',   sql.Int, data.DiasCaducidad);
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
    let data = matchedData(req,{locations:['params','query']});
    console.log('Changing state')
    console.log(IdProducto + ' ! ', Habilitado)
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProducto', sql.Int(), data.IdProducto)
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit(), +data.Habilitado)
    db.storedProcExecute('USP_DISP_PRODUCTO', aoj)
        .then((results) => {
            console.log(results)
            let afectadas = results.rowsAffected[0]
            let accion = (Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
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