const sql = require('mssql');
const db = require('../services/database');

function createRol(req,res){ 
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'NombreRol',sql.NVarChar(50),data.NombreRol)
    db.pushAOJParam(aoj, 'DescripcionRol',sql.NVarChar(150),data.DescripcionRol)
    db.storedProcExecute('USP_CREATE_ROL_USUARIO')
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json(err)
    })
}
function getRoles(req,res){
    let Habilitado = req.query.Habilitado;
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado)
    db.storedProcExecute('USP_GET_ROLES', aoj)
    .then((results) => {
        res.status(200).json({
            roles:results.recordset
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function getRolbyId(req,res){
    var IdCargo = req.params.IdCargo;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdRol',sql.Int,IdRol)
    db.storedProcExecute('USP_GET_ROL', aoj) 
    .then((results) => {
        res.status(200).json({
            rol:results.recordset
        })
    }).catch((err) => {
    });
    res.status(500).json(err)
}
function updateRol(req,res){
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdRol',sql.Int,data.IdRol)
    db.pushAOJParam(aoj, 'NombreRol',sql.NVarChar(50),data.NombreRol)
    db.pushAOJParam(aoj, 'DescripcionRol',sql.NVarChar(150),data.DescripcionRol)
    db.storedProcExecute('USP_UPDATE_ROL', aoj)
    .then((results) => {
        res.status(200).json({
            success:'rol Actualizada Exitosamente!'
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}

module.exports={
    createRol,
    getRoles,
    getRolbyId,
    updateRol
}