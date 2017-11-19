var querys = require('../querys/producto')
var config = require('../config/mssqlConfig')

function getTrabajadorById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getProductoById(poolObt,data.IdProducto)
        }).then((results) => {
           res.status(200).json({ producto:results.recordset[0] }) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getTrabajadores(req,res){
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getProductos(poolObt)
    }).then((results) => {
       res.status(200).json({productos:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createTrabajador(req,res){
    var data=req.body
    config.getConnectionPoolGlobal()-then((poolObt) => {
        return querys.createProducto(poolObt,data)        
    }).then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
function updateTrabajador(req,res){
    var data = req.body
    config.getConnectionPoolGlobal()-then((poolObt) => {
        return querys.updateProducto(poolObt,data)        
    }).then((results) => {
        res.status(200).json({
            success:'Producto Actualizado exitosamente!!'
        })
        console.log('Trabajador Actualizado con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
function changeStateTrabajador(req,res){
    var Habilitado = req.body.Habilitado
    var IdTrabajador = req.params.IdTrabajador
    config.getConnectionPoolGlobal()-then((poolObt) => {
        return querys.changeStateProducto(poolObt,IdTrabajador,Habilitado)        
    }).then((results) => {
        res.status(200).json(results)
        console.log('Trabajador '+(Habilitado) ? 'Habilitado' : 'Deshabilitado' +' con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
module.exports={
    createProducto,
    getProductoById,
    getProductos,
    updateProducto,
    changeStateProducto
}