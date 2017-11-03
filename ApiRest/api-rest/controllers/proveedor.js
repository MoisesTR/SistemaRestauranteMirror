var querys = require('../querys/proveedor')
var config = require('../config/mssqlConfig')

function getProveedorById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getProveedorById(poolObt,data.IdProveedor)
        }).then((results) => {
           res.status(200).json({proveedor:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getProveedores(req,res){
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getProveedores(poolObt)
    }).then((results) => {
       res.status(200).json({proveedores:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createProveedor(req,res){
    var data = req.body
    console.log(data)
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.createProveedor(poolObt,data)
    }).then((results) => {
       res.status(200).json(results.recordset[0]) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function updateProveedor(req,res){
    var data = req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.updateProveedor(poolObt,data)
    }).then((results) => {
       res.status(200).json({
           success:'Proveedor Actualizado con exito!!'
       }) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
module.exports={
    createProveedor,
    getProveedorById,
    getProveedores,
    updateProveedor
}