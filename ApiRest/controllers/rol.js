const sql               = require('mssql');
const db                = require('../services/database');
const { mssqlErrors }   = require('../Utils/util');
const {matchedData}     = require('express-validator/filter')

function createRol(req,res){ 
    var data = matchedData(req, {locations: ['body']});
    var aoj = [];
    db.pushAOJParam(aoj, 'NombreRol',       sql.NVarChar(50),   data.NombreRol)
    db.pushAOJParam(aoj, 'DescripcionRol',  sql.NVarChar(150),  data.DescripcionRol)
    db.storedProcExecute('USP_CREATE_ROL_USUARIO', aoj)
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
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
        res.status(500).json( mssqlErrors(err) );
    });
}
function getRolbyId(req,res){
    var IdCargo = req.params.IdCargo;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdRol',   sql.Int,    IdRol)
    db.storedProcExecute('USP_GET_ROL', aoj) 
    .then((results) => {
        res.status(200).json({
            rol:results.recordset
        })
    }).catch((err) => {
    });
    res.status(500).json( mssqlErrors(err) );
}
function updateRol(req,res){
    var data = matchedData(req, {locations: ['body', 'param']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdRol',       sql.Int,            data.IdRol)
    db.pushAOJParam(aoj, 'NombreRol',   sql.NVarChar(50),   data.NombreRol)
    db.pushAOJParam(aoj, 'DescripcionRol',sql.NVarChar(150),data.DescripcionRol)
    db.storedProcExecute('USP_UPDATE_ROL', aoj)
    .then((results) => {
        res.status(200).json({
            success:'rol Actualizada Exitosamente!'
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}

module.exports={
    createRol,
    getRoles,
    getRolbyId,
    updateRol
}