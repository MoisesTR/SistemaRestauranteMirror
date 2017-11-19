var querys = require('../querys/trabajador')
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
    config.getConnectionPoolGlobal().then((poolObt) => {
        ('IdSucursal',sql.Int,trabajadorData.IdSucursal)
        ('IdCargo',sql.Int,trabajadorData.IdCargo)
        ('Nombres',sql.NVarChar(50),trabajadorData.Nombres)
        ('Apellidos',sql.NVarChar(50),trabajadorData.Apellidos)
        ('NumeroCedula',sql.NVarChar(50),trabajadorData.NumeroCedula)
        ('FechaNacimiento',sql.Date,trabajadorData.FechaNacimiento)
        ('Direccion',sql.NVarChar(300),trabajadorData.Direccion)    
        ('FechaIngreso',sql.Date,trabajadorData.FechaIngreso)
        return querys.c0reateProducto(poolObt,data)        
    }).then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
function updateTrabajador(req,res){
    var data = req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
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
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.changeStateProducto(poolObt,IdTrabajador,Habilitado)        
    }).then((results) => {
        res.status(200).json(results)
        console.log('Trabajador '+(Habilitado) ? 'Habilitado' : 'Deshabilitado' +' con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
module.exports={
   createTrabajador,
   getTrabajadores,
   getTrabajadorById,
   updateTrabajador,
   changeStateTrabajador
}