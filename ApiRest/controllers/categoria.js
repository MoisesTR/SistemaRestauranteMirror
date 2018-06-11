const { matchedData } = require('express-validator/filter')
const { mssqlErrors } = require('../Utils/util');
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
        // res.status(500).json( err );
    })
}
function getCategorias(req,res){
    let data = matchedData(req, {locations:['query']});
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado',sql.Bit() , +data.Habilitado)
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
    var data = matchedData(req,{locations: ['body','params']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdCategoria',sql.Int,data.IdCategoria)
    db.pushAOJParam(aoj, 'NombreCategoria',sql.NVarChar(50),data.NombreCategoria)
    db.pushAOJParam(aoj, 'DescripcionCategoria',sql.NVarChar(150),data.DescripcionCategoria)
    db.storedProcExecute('USP_UPDATE_CATEGORIA', aoj)
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json((afectadas > 0) ? { success: 'Categoria modificada con exito!' } : { failed: 'No se encontro la Categoria solicitada!' })
    
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
    let data = matchedData(req,{locations:['body','params']});
    var aoj = [];
    console.log(data)
    db.pushAOJParam(aoj, 'IdCategoria', sql.Int(), data.IdCategoria);
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit(), +data.Habilitado);
    db.storedProcExecute('USP_DISP_CATEGORIA', aoj).then((results) => {
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitada' : 'Habilitada';
        res.status(200).json((afectadas > 0) ? { success: 'Categoria ' + accion + ' con exito!' } : { failed: 'No se encontro la categoria solicitado!' })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports={
    createCategoria,
    getCategoriaById,
    getCategorias,
    updateCategoria,
    changeStateCategoria
}