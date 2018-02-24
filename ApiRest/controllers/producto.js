var fs = require('fs');
var path = require('path');
var sql = require('mssql');
var db = require('../services/database');

function getProductoById(req, res) {
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProducto', sql.Int, data.IdProducto)
    db.storedProcExecute('USP_GET_PRODUCTO', aoj)
        .then((results) => {
            res.status(200).json({
                producto: results.recordset[0]
            });
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getProductos(req, res) {
    let Habilitado = req.query.Habilitado;
    (!Habilitado) ? console.log('sin query'): console.log('con query');
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, Habilitado)
    db.storedProcExecute('USP_GET_PRODUCTOS', aoj)
        .then((results) => {
            res.status(200).json({
                productos: results.recordset
            });
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function createProducto(req, res) {
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdCategoria', sql.Int, data.IdCategoria)
    db.pushAOJParam(aoj, 'IdSubclasificacion', sql.Int, data.IdSubclasificacion)
    db.pushAOJParam(aoj, 'IdEstado', sql.Int, data.IdEstado)
    db.pushAOJParam(aoj, 'NombreProducto', sql.NVarChar(50), data.NombreProducto)
    db.pushAOJParam(aoj, 'Descripcion', sql.NVarChar(200), data.Descripcion)
    db.pushAOJParam(aoj, 'Imagen', sql.NVarChar(100), data.Imagen)
    db.storedProcExecute('USP_CREATE_PRODUCTO', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json({
                mensaje: err.originalError.info.message,
                codigo: 'PRUEBA'
            })
        });
}

function updateProducto(req, res) {
    var data = req.body;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProducto', sql.Int, data.IdProducto)
    db.pushAOJParam(aoj, 'IdCategoria', sql.Int, data.IdCategoria)
    db.pushAOJParam(aoj, 'IdSubclasificacion', sql.Int, data.IdSubclasificacion)
    db.pushAOJParam(aoj, 'IdEstado', sql.Int, data.IdEstado)
    db.pushAOJParam(aoj, 'NombreProducto', sql.NVarChar(50), data.NombreProducto)
    db.pushAOJParam(aoj, 'Descripcion', sql.NVarChar(200), data.Descripcion)
    db.pushAOJParam(aoj, 'Imagen', sql.NVarChar(100), data.Imagen)
    db.storedProcExecute('USP_UPDATE_PRODUCTO', aoj)
        .then((results) => {
            res.status(200).json({
                success: 'Producto Actualizado exitosamente!!'
            });
            console.log('Producto Actualizado con exito!')
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function changeStateProducto(req, res) {
    let IdProducto = req.params.IdProducto;
    let Habilitado = req.body.Habilitado;
    console.log('Changing state')
    console.log(IdProducto + ' ! ', Habilitado)
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProducto', sql.Int, IdProducto)
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, Habilitado)
    db.storedProcExecute('USP_DISP_PRODUCTO', aoj)
        .then((results) => {
            console.log(results)
            let afectadas = results.rowsAffected[0]
            let accion = (Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
            res.status(200).json((afectadas > 0) ? { success: 'Producto ' + accion + ' con exito!' } : { failed: 'No se encontro el producto solicitado!' })
            console.log('Producto cambiado de estado con exito!')
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
            console.log('Error:', err)
        });
}

function uploadImage(req, res) {
    var IdProducto = req.params.IdProducto;
    var file_name = 'No Subido...';

    if (req.files) {

        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            res.status(200).send({ image: file_name });
        } else {
            fs.unlink(file_path, (err) => {
                if (err) {
                    res.status(200).send({ message: 'Extension no valida, el fichero no se pudo borrar' });
                } else {
                    res.status(200).send({ message: 'Extension no valida' });
                }
            });
            res.status(200).send({ message: 'Extension no valida' });
        }

    } else {
        res.status(200).send({ message: 'No se han subido archivos' });
    }


}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/productos/' + imageFile;

    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(404).send({ message: 'La imagen no existe' });
        }
    });

}
module.exports = {
    createProducto,
    getProductoById,
    getProductos,
    updateProducto,
    changeStateProducto,
    uploadImage,
    getImageFile
}