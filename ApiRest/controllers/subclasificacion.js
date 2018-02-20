var config = require('../config/mssqlConfig')
const sql = require('mssql');

function getSubclasificacionById(req,res){
    var data = req.params;
    db.pushAOJParam(aoj, 'IdSubClasificacion',sql.Int,IdSubClasificacion)
        db.storedProcExecute('USP_GET_SUBCLASIFICACION');
        
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getSubclasificacionById(poolObt,data.IdSubclasificacion)
        }).then((results) => {
           res.status(200).json({subclasificacion:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json( mssqlErrors(err) );
        });
}
function getSubclasificaciones(req,res){
    db.storedProcExecute('USP_GET_SUBCLASIFICACIONES');
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getSubclasificaciones(poolObt)
    }).then((results) => {
       res.status(200).json({subclasificaciones:results.recordset }) 
    }).catch((err) => {
        console.dir(err)
        res.status(500).json( mssqlErrors(err) );
    });
}

function createSubclasificacion(req,res){
    var data = req.body;
    db.pushAOJParam(aoj, 'IdClasificacion',sql.Int,data.IdClasificacion)
        db.pushAOJParam(aoj, 'NombreSubClasificacion',sql.NVarChar(50),data.NombreSubClasificacion)
        db.pushAOJParam(aoj, 'DescripcionSubClasificacion',sql.NVarChar(150),data.DescripcionSubClasificacion)
        db.storedProcExecute('USP_CREATE_SUBCLASIFICACION'); 
    console.log(data);
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.createSubClasificacion(poolObt,data)
    }).then((results) => {
       res.status(200).json(results.recordset[0]) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function updateSubclasificacion(req,res){
    var data = req.body;
    db.pushAOJParam(aoj, 'IdSubClasificacion',sql.Int,data.IdSubclasificacion)
    db.pushAOJParam(aoj, 'IdClasificacion',sql.Int,data.IdClasificacion)
    db.pushAOJParam(aoj, 'NombreClasificacion',sql.NVarChar(50),data.NombreClasificacion)
    db.pushAOJParam(aoj, 'DescripcionClasificacion'.sql.NVarChar(150),data.DescripcionClasificacion)
    db.storedProcExecute('USP_UPDATE_SUBCLASIFICACION');
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.updateSubclasificacion(poolObt,data)
    }).then((results) => {
       res.status(200).json({
           success:'Subclasificacion Actualizada con exito!!'
       }) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function disSubclasificaciones(pool,IdSubClasificacion){
    return pool.request()
        db.pushAOJParam(aoj, 'IdSubClasificacion',sql.Int,IdSubClasificacion)
        db.storedProcExecute('USP_DISP_SUBCLASIFICACION');
}
function getSubclasificacionesByIdClasificacion(req,res){
    var data = req.params;
    db.pushAOJParam(aoj, 'IdClasificacion',sql.Int,IdClasificacion)
        db.storedProcExecute('USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION');
        config.getConnectionPoolGlobal().then((poolObt) => {
            console.log('IdClasificacion:',data)
           return querys.getSubclasificacionesByIdClasificacion(poolObt,data.IdClasificacion)
        }).then((results) => {
           res.status(200).json({subclasificaciones:results.recordset}) 
        }).catch((err) => {
            res.status(500).json( mssqlErrors(err) );
        });
}
function changeStateSubClasificacion(req,res){
    let IdSubClasificacion = req.params.IdSubClasificacion
    let Habilitado = req.body.Habilitado
    db.pushAOJParam(aoj, 'IdSubClasificacion',sql.Int,IdSubClasificacion)
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado)
    db.storedProcExecute('USP_DISP_SUBCLASIFICACION')
    console.log('IdSubClasificacion:'+IdSubClasificacion,'Habilitado:'+Habilitado)
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.changeStateSubClasificacion(poolObt,IdSubClasificacion,Habilitado)        
    }).then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (Habilitado == 0) ? 'Deshabilitada' : 'Habilitada';
        res.status(200).json((afectadas > 0) ? {success:'SubClasificacion'+accion+' con exito!'} :{failed:'No se encontro la SubClasificacion solicitada!'})
        console.log('SubClasificacion cambiada de estado con exito!')
    }).catch((err) => {
       res.status(500).json( mssqlErrors(err) ); 
       console.log('Error:',err)
    });
}
module.exports={
    createSubclasificacion,
    getSubclasificacionById,
    getSubclasificaciones,
    updateSubclasificacion,
    getSubclasificacionesByIdClasificacion,
    changeStateSubClasificacion
}