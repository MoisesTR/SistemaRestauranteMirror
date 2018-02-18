var config = require('../config/mssqlConfig');
const { matchedData, sanitize } = require('express-validator/filter');
const sql = require('mssql');
const db = require('../services/database');

function getProductoProveedorById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getProductoById(poolObt,data.IdProducto)
        }).then((results) => {
           res.status(200).json({ producto:results.recordset[0] }) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getProveedoresOfProducto(req,res){
    var data = req.body;
    db.pushAOJParam(aoj, 'IdProductoProveedor',sql.Int,IdProductoProveedor)
        .execute('USP_GET_PRODUCTO_PROVEEDOR')
    config.getConnectionPoolGlobal().then((pooObt) => {
        return querys.getProductoById(pooObt,data.IdProducto)
    }).then((results) => {
        res.status(200).json({productos:results.recordset})
    }).catch((err ) => {
        res.status(500).json(err);
    })
}
function getProductosProveedores(req,res){
    .execute('USP_GET_PRODUCTOS_PROVEEDORES');
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getProductosProveedores(poolObt)
    }).then((results) => {
       res.status(200).json({productos:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createProductoProveedor(req,res){
    var data=matchedData(req,{locations:'body'});
    db.pushAOJParam(aoj, 'IdProducto',sql.Int,data.IdProducto)
    db.pushAOJParam(aoj, 'IdProveedor',sql.Int,data.IdProveedor)
    db.pushAOJParam(aoj, 'IdEnvase',sql.Int,data.IdEnvase)
    db.pushAOJParam(aoj, 'IdEmpaque',sql.Int,data.IdEmpaque)
    db.pushAOJParam(aoj, 'Costo',sql.Float,data.Costo)
    db.pushAOJParam(aoj, 'CantidadEmpaque',sql.Int,data.CantidadEmpaque)
    db.pushAOJParam(aoj, 'IdUnidadMedida',sql.Int,data.IdUnidadMedida)
    db.pushAOJParam(aoj, 'ValorUnidadMedida',sql.Float,data.ValorUnidadMedida)
    db.pushAOJParam(aoj, 'DiasCaducidad',sql.Int,data.DiasCaducidad)
    .execute('USP_CREATE_PRODUCTO_PROVEEDOR')
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.createProductoProveedor(poolObt,data)        
    }).then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
function getProductosByProveedorId(req,res){

}
function updateProducto(req,res){
    var data = req.body;
    db.pushAOJParam(aoj, 'IdProductoProveedor',sql.Int,data.IdProducto)
    db.pushAOJParam(aoj, 'IdEnvase',sql.Int,data.IdEnvase)
    db.pushAOJParam(aoj, 'IdEmpaque',sql.Int,data.IdEmpaque)
    db.pushAOJParam(aoj, 'Costo',sql.Float,data.Costo)
    db.pushAOJParam(aoj, 'CantidadEmpaque',sql.Int,data.CantidadEmpaque)
    db.pushAOJParam(aoj, 'IdUnidadMedida',sql.Int,data.IdUnidadMedida)
    db.pushAOJParam(aoj, 'ValorUnidadMedida',sql.Float,data.ValorUnidadMedida)
    .execute('USP_UPDATE_PRODUCTO')
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.updateProducto(poolObt,data)        
    }).then((results) => {
        res.status(200).json({
            success:'Producto Actualizado exitosamente!!'
        })
        console.log('Producto Actualizado con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
function changeStateProductoProveedor(req,res){
    var data = req.body;
    db.pushAOJParam(aoj, 'IdProductoProveedor',sql.Int,IdProductoProveedor)
    .execute('USP_DISP_PRODUCTO_PROVEEDOR')
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.changeStateProducto(poolObt,IdProducto)        
    }).then((results) => {
        res.status(200).json(results)
        console.log('Producto cambiado de estado con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
function changeStateProducoPro(req,res){

}
module.exports={
    createProductoProveedor,
    changeStateProductoProveedor,
    getProductosProveedores,
    getProductoProveedorById,
    getProveedoresOfProducto,
    getProductosByProveedorId
}