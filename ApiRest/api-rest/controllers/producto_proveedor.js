var querys = require('../querys/producto_proveedor')
var config = require('../config/mssqlConfig')

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
    config.getConnectionPoolGlobal().then((pooObt) => {
        return querys.getProductoById(pooObt,data.IdProducto)
    }).then((results) => {
        res.status(200).json({productos:results.recordset})
    }).catch((err ) => {
        res.status(500).json(err);
    })
}
function getProductosProveedores(req,res){
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getProductosProveedores(poolObt)
    }).then((results) => {
       res.status(200).json({productos:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createProductoProveedor(req,res){
    var data=req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.createProducto(poolObt,data)        
    }).then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
function getProductosByProveedorId(req,res){

}
function updateProducto(req,res){
    var data = req.body
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
    var data = req.body
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