const config = require('../config/mssqlConfig');
const sql  = require('mssql');

function createCategoria(req,res){ 
    var data = req.body
    console.log(((data.NombreCategoria != undefined) && (data.DescripcionCategoria != undefined)))
    db.pushAOJParam(aoj, 'NombreCategoria',sql.NVarChar(50),data.NombreCategoria)
        db.pushAOJParam(aoj, 'DescripcionCategoria',sql.NVarChar(150),data.DescripcionCategoria)
        .execute('USP_CREATE_CATEGORIA')
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.createCategoria(poolObt,data)
        }).then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(err)
        })
}
function getCategorias(req,res){
    let Habilitado = req.query.Habilitado;
    db.pushAOJParam(aoj, 'Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_CATEGORIAS');
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getCategorias(poolObt,Habilitado);
    }).then((results) => {
        res.status(200).json({
            categorias:results.recordset
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function updateCategoria(req,res){
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdCategoria',sql.Int,data.IdCategoria)
    db.pushAOJParam(aoj, 'NombreCategoria',sql.NVarChar(50),data.NombreCategoria)
    db.pushAOJParam(aoj, 'DescripcionCategoria',sql.NVarChar(150),data.DescripcionCategoria)
        .execute('USP_UPDATE_CATEGORIA')
    config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.updateCategoria(poolObt,data)
        }).then((results) => {
            res.status(200).json({
                success:'Categoria Actualizada Exitosamente!'
            })
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getCategoriaById(req,res){
    var data = req.params;
    var aoj  = [];
    db.pushAOJParam(aoj, 'IdCategoria',sql.Int,IdCategoria)
        .execute('USP_GET_CATEGORIA_BY_ID')
    if(data.IdCategoria){
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getCategoriaById(poolObt,data.IdCategoria)
        }).then((results) => {
           res.status(200).json({categoria:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
    }else{
        res.status(401).json({
            error:true,
            code:'EPARAMS',
            message:'Envie el id de la Categoria a Obtener'
        })
    }
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