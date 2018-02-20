const database = require('../services/database')
const sql = require('mssql')

function createClasificacion(req,res){ 
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'NombreClasificacion',sql.NVarChar(50),data.NombreClasificacion);
    db.pushAOJParam(aoj, 'DescripcionClasificacion',sql.NVarChar(150),data.DescripcionClasificacion);
    db.storedProcExecute('USP_CREATE_CLASIFICACION', aoj)
    .then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}
function getClasificaciones(req,res){
    let Habilitado = req.query.Habilitado;
    var aoj  = [];
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado);
    db.storedProcExecute('USP_GET_CLASIFICACIONES', aoj)
    .then((results) => {
        res.status(200).json({
            clasificaciones:results.recordset
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function updateClasificacion(req,res){
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdClasificacion',sql.Int,data.IdClasificacion)
    db.pushAOJParam(aoj, 'NombreClasificacion',sql.NVarChar(50),data.NombreClasificacion)
    db.pushAOJParam(aoj, 'DescripcionClasificacion',sql.NVarChar(150),data.DescripcionClasificacion)
    db.storedProcExecute('USP_UPDATE_CLASIFICACION', aoj)
    .then((results) => {
        res.status(200).json({success:'Clasificacion actualizada con exito!'})
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function getClasificacionById(req,res){
    var data = req.params;
    var aoj  = [];
    db.pushAOJParam(aoj, 'IdClasificacion',sql.Int,IdClasificacion);
    db.storedProcExecute('USP_GET_CLASIFICACION', aoj)
    .then((results) => {
        res.status(200).json({clasificacion:results.recordset[0]}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function changeStateClasificacion(req,res){
    let IdClasificacion= req.params.IdClasificacion
    let Habilitado = req.body.Habilitado
    console.log('IdClasificacion:'+IdClasificacion,'Habilitado:'+Habilitado)
    var aoj=[];
    database.pushAOJParam(aoj,'IdClasificacion',sql.Int,IdClasificacion);
    database.pushAOJParam(aoj,'Habilitado',sql.Int,Habilitado);
    database.storedProcExecute('USP_DISP_CLASIFICACION',aoj)
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? {success:'Clasificacion '+accion+' con exito!'} :{failed:'No se encontro la clasificacion solicitada!'})
        console.log('Clasificacion cambiado de estado con exito!')
    }).catch((err) => {
       res.status(500).json( mssqlErrors(err) ); 
       console.log('Error:',err)
    });
}
module.exports={
   createClasificacion,
   getClasificacionById,
   getClasificaciones,
   updateClasificacion,
   changeStateClasificacion
}
