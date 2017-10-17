var querys = require('../querys/sucursal')
var config = require('../config/mssqlConfig')

function getSucursalById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getSucursal(poolObt,data.IdSucursal)
        }).then((results) => {
           res.status(200).json({
               sucursal:results.recordset[0],
               cantidad:results.rowsAffected[0]
           }) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getSucursales(req,res){
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getSucursales(poolObt)
        }).then((results) => {
           res.status(200).json({
               sucursales:results.recordset[0],
               cantidad:results.rowsAffected[0]
           }) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function createSucursal(req,res){
    var data = req.body;
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.createSucusal(poolObt,data)
    }).then((results) => {
        res.status(200).json(results)
    }).catch((err) => {
        res.status(500).json(err)
    })
}
module.exports={
    createSucursal,
    getSucursales,
    getSucursalById
}