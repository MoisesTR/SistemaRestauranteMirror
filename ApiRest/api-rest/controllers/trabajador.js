var querys = require('../querys/trabajador')
var config = require('../config/mssqlConfig')
const { matchedData, sanitize } = require('express-validator/filter');

function getTrabajadorById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getTrabajador(poolObt,data.IdTrabajador)
        }).then((results) => {
           res.status(200).json({ producto:results.recordset[0] }) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getTrabajadores(req,res){
    let Habilitado = req.query.Habilitado
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getTrabajadores(poolObt,Habilitado)
    }).then((results) => {
       res.status(200).json({trabajadores:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function setDataRepetida(){
    ('IdSucursal',sql.Int,trabajadorData.IdSucursal)
    ('IdCargo',sql.Int,trabajadorData.IdCargo)
    ('Nombres',sql.NVarChar(50),trabajadorData.Nombres)
    ('Apellidos',sql.NVarChar(50),trabajadorData.Apellidos)
    ('NumeroCedula',sql.NVarChar(50),trabajadorData.NumeroCedula)
    ('FechaNacimiento',sql.Date,trabajadorData.FechaNacimiento)
    ('Direccion',sql.NVarChar(300),trabajadorData.Direccion)    
    ('FechaIngreso',sql.Date,trabajadorData.FechaIngreso)
}
function createTrabajador(req,res){
    var trabajadorData=matchedData(req,{locations:['body']});
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.createTrabajador(poolObt,trabajadorData)        
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