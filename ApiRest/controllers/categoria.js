const {matchedData} = require('express-validator/filter')
const {mssqlErrors} = require('../Utils/util');
const sql  = require('mssql');
const db    = require('../services/database');

function createCategoria(req,res){ 
    var data = matchedData(req)
    var aoj = [];
    db.pushAOJParam(aoj, 'NombreCategoria',sql.NVarChar(50),data.NombreCategoria)
    db.pushAOJParam(aoj, 'DescripcionCategoria',sql.NVarChar(150),data.DescripcionCategoria)
    db.storedProcExecute('USP_CREATE_CATEGORIA', aoj)
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function getCategorias(req,res){
    let Habilitado = req.query.Habilitado;
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado)
    db.storedProcExecute('USP_GET_CATEGORIAS', aoj)
    .then((results) => {
        res.status(200).json({
            categorias:results.recordset
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function updateCategoria(req,res){
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdCategoria',sql.Int,data.IdCategoria)
    db.pushAOJParam(aoj, 'NombreCategoria',sql.NVarChar(50),data.NombreCategoria)
    db.pushAOJParam(aoj, 'DescripcionCategoria',sql.NVarChar(150),data.DescripcionCategoria)
    db.storedProcExecute('USP_UPDATE_CATEGORIA', aoj)
    .then((results) => {
        res.status(200).json({
            success:'Categoria Actualizada Exitosamente!'
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function getCategoriaById(req,res){
    var data = req.params;
    var aoj  = [];
    db.pushAOJParam(aoj, 'IdCategoria',sql.Int,data.IdCategoria);
    db.storedProcExecute('USP_GET_CATEGORIA_BY_ID', aoj)
    .then((results) => {
        res.status(200).json({categoria:results.recordset[0]}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function changeStateCategoria(req,res){

}
module.exports={
    createCategoria,
    getCategoriaById,
    getCategorias,
    updateCategoria,
    changeStateCategoria
}