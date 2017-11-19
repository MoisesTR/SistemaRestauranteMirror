var querys = require('../querys/producto')
var config = require('../config/mssqlConfig')
var fs = require('fs');
var path = require('path');

function getProductoById(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.getProductoById(poolObt,data.IdProducto)
        }).then((results) => {
           res.status(200).json({ producto:results.recordset[0] }) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getProductos(req,res){
    let Habilitado = req.query.Habilitado;
    config.getConnectionPoolGlobal().then((poolObt) => {
       return querys.getProductos(poolObt,Habilitado)
    }).then((results) => {
       res.status(200).json({productos:results.recordset}) 
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function createProducto(req,res){
    var data=req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.createProducto(poolObt,data)        
    }).then((results) => {
        res.status(200).json(results.recordset[0])
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
function updateProducto(req,res){
    var data = req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.updateProducto(poolObt,data)        
    }).then((results) => {
        res.status(200).json({
            success:'Producto Actualizado exitosamente!!'
        })
        console.log('Producto Actualizado con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
    });
}
function changeStateProducto(req,res){
    let IdProducto = req.params.IdProducto
    let Habilitado = req.body.Habilitado
    console.log('IdProducto:'+IdProducto,'Habilitado:'+Habilitado)
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.changeStateProducto(poolObt,IdProducto,Habilitado)        
    }).then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? {success:'Producto '+accion+' con exito!'} :{failed:'No se encontro el producto solicitado!'})
        console.log('Producto cambiado de estado con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
       console.log('Error:',err)
    });
}

function uploadImage(req,res){
   var IdProducto = req.params.IdProducto;
   var file_name  = 'No Subido...';

   if(req.files) {

    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
        res.status(200).send({image:file_name});
    } else {
        fs.unlink(file_path,(err) =>{
            if(err){
                res.status(200).send({message:'Extension no valida, el fichero no se pudo borrar'});
            } else {
                res.status(200).send({message:'Extension no valida'});
            }
        });
        res.status(200).send({message:'Extension no valida'});
    }
     
   } else {
       res.status(200).send({message:'No se han subido archivos'});
   }


}

function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/productos/'+imageFile;

    fs.exists(path_file,function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(404).send({message: 'La imagen no existe'});
        }
    });

}
module.exports={
    createProducto,
    getProductoById,
    getProductos,
    updateProducto,
    changeStateProducto,
    uploadImage, 
    getImageFile
}