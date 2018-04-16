const { mssqlErrors } = require('../Utils/util')
const { matchedData, sanitize } = require('express-validator/filter');
var fs = require('fs');
var path = require('path');
const db = require('../services/database');
const sql = require('mssql')

function getTrabajadorById(req, res) {
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdTrabajador', sql.Int, data.IdSucursal);
    db.storedProcExecute('USP_GET_TRABAJADOR', aoj)
        .then((results) => {
            res.status(200).json({ trabajador: results.recordset[0] })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getTrabajadores(req, res) {
    let Habilitado = req.query.Habilitado
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, Habilitado);
    db.storedProcExecute('USP_GET_TRABAJADORES', aoj)
        .then((results) => {
            res.status(200).json({ trabajadores: results.recordset })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function createTrabajador(req, res) {
    var trabajadorData = matchedData(req, { locations: ['body'] });
    var aoj = [];
    console.log(trabajadorData)
    db.pushAOJParam(aoj, 'IdSucursal', sql.Int, trabajadorData.IdSucursal);
    db.pushAOJParam(aoj, 'IdCargo', sql.Int, trabajadorData.IdCargo);
    db.pushAOJParam(aoj, 'Nombres', sql.NVarChar(50), trabajadorData.Nombres);
    db.pushAOJParam(aoj, 'Apellidos', sql.NVarChar(50), trabajadorData.Apellidos);
    db.pushAOJParam(aoj, 'IdDocumento', sql.Int, trabajadorData.IdDocumento);
    db.pushAOJParam(aoj, 'Documento', sql.NVarChar(50), trabajadorData.Documento);
    db.pushAOJParam(aoj, 'Imagen', sql.NVarChar(50), trabajadorData.Imagen);
    db.pushAOJParam(aoj, 'FechaNacimiento', sql.Date, trabajadorData.FechaNacimiento);
    db.pushAOJParam(aoj, 'Direccion', sql.NVarChar(300), trabajadorData.Direccion);
    db.pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), trabajadorData.Telefono1);
    db.pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), trabajadorData.Telefono2);
    db.pushAOJParam(aoj, 'FechaIngreso', sql.Date, trabajadorData.FechaIngreso);
    // db.pushOutParam(aoj, 'IdTrabajador', sql.Int)
    db.storedProcExecute('USP_CREATE_TRABAJADOR', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function updateTrabajador(req, res) {
    var trabajadorData = matchedData(req);
    var aoj = [];
    db.pushAOJParam(aoj, 'IdSucursal', sql.Int, trabajadorData.IdSucursal);
    db.pushAOJParam(aoj, 'IdCargo', sql.Int, trabajadorData.IdCargo);
    db.pushAOJParam(aoj, 'Nombres', sql.NVarChar(50), trabajadorData.Nombres);
    db.pushAOJParam(aoj, 'Apellidos', sql.NVarChar(50), trabajadorData.Apellidos);
    db.pushAOJParam(aoj, 'IdDocumento', sql.Int, trabajadorData.IdDocumento);
    db.pushAOJParam(aoj, 'Documento', sql.NVarChar(50), trabajadorData.Documento);
    db.pushAOJParam(aoj, 'Imagen', sql.NVarChar(50), trabajadorData.Imagen);
    db.pushAOJParam(aoj, 'FechaNacimiento', sql.Date, trabajadorData.FechaNacimiento);
    db.pushAOJParam(aoj, 'Direccion', sql.NVarChar(300), trabajadorData.Direccion);
    db.pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), trabajadorData.Telefono1);
    db.pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), trabajadorData.Telefono2);
    db.pushAOJParam(aoj, 'FechaIngreso', sql.Date, trabajadorData.FechaIngreso);
    db.pushAOJParam(aoj, 'IdTrabajador', sql.Int, trabajadorData.IdTrabajador);
    db.storedProcExecute('USP_UPDATE_TRABAJADOR', aoj)
        .then((results) => {
            res.status(200).json({
                success: 'Trabajador actualizado con exito!'
            })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function changeStateTrabajador(req, res) {
    var data = matchedData(req);
    var aoj = [];
    console.log('Changing state')
    db.pushAOJParam(aoj, 'IdProducto', sql.Int, data.IdTrabajador)
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, Habilitado)
    db.storedProcExecute('USP_DISP_TRABAJADOR', aoj)
        .then((results) => {
            res.status(200).json({
                success: 'Trabajador ' + (Habilitado) ? 'Habilitado' : 'Deshabilitado' + ' con exito!'
            })
            console.log('Trabajador ' + (Habilitado) ? 'Habilitado' : 'Deshabilitado' + ' con exito!')
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}


function uploadImage(req, res) {
    var IdProducto = req.params.IdTrabajador;
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
    var path_file = './uploads/trabajadores/' + imageFile;

    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(404).send({ message: 'La imagen no existe' });
        }
    });

}

module.exports = {
    createTrabajador,
    getTrabajadores,
    getTrabajadorById,
    updateTrabajador,
    changeStateTrabajador,
    uploadImage,
    getImageFile
}