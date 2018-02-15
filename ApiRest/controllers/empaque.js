var querys = require('../querys/empaque')
var config = require('../config/mssqlConfig')

function getEmpaqueById(req,res){
    var data = req.params;
    db.pushAOJParam(aoj, 'IdEmpaque',sql.Int,IdEmpaque)
        .query('SELECT IdEmpaque,NombreEmpaque,Descripcion,Habilitado FROM EMPAQUE WHERE IdEmpaque = @IdEmpaque')
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getEmpaque(poolObt,data.IdEmpaque)
        }).then((results) => {
           res.status(200).json({empaque:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getEmpaques(req,res){
    let Habilitado = req.query.Habilitado;
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_EMPAQUES')
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getEmpaques(poolObt,Habilitado)
    }).then((results) => {
       res.status(200).json({empaques:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createEmpaque(req,res){
    var data = req.body;
    db.pushAOJParam(aoj, 'NombreEmpaque',sql.NVarChar(50),data.NombreEmpaque)
        db.pushAOJParam(aoj, 'Descripcion',sql.NVarChar(150),data.Descripcion)
        .execute('USP_CREATE_EMPAQUE')
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.createEmpaque(poolObt,data)
    }).then((results) => {
       res.status(200).json(results.recordset[0]) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function updateEmpaque(req,res){
    var data = req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.updateEmpaque(poolObt,data)
    }).then((results) => {
       res.status(200).json({
           success:'Empaque Actualizado con exito!'
       }) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
module.exports={
    createEmpaque,
    getEmpaqueById,
    getEmpaques,
    updateEmpaque
}
