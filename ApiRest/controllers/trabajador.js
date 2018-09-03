const { mssqlErrors }           = require('../Utils/util')
const { matchedData, sanitize } = require('express-validator/filter');
const   db                      = require('../services/database');
const   sql                     = require('mssql')

function getTrabajadorById(req, res) {
    var data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdTrabajador', sql.Int, data.IdTrabajador);
    db.storedProcExecute('USP_GET_TRABAJADOR', aoj)
        .then((results) => {
            res.status(200).json({ trabajador: results.recordset[0] })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getTrabajadores(req, res) {
    let data = matchedData(req,{locations:['query']});
    var aoj = [];
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado);
    db.pushAOJParam(aoj, 'IdSucursal', sql.Int, data.IdSucursal);
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
    db.pushAOJParam(aoj, 'IdTipoDocumento', sql.Int, trabajadorData.IdTipoDocumento);
    db.pushAOJParam(aoj, 'Documento', sql.NVarChar(50), trabajadorData.Documento);
    db.pushAOJParam(aoj, 'Imagen', sql.NVarChar(50), trabajadorData.Imagen);
    db.pushAOJParam(aoj, 'FechaNacimiento', sql.Date(), trabajadorData.FechaNacimiento);
    db.pushAOJParam(aoj, 'Direccion', sql.NVarChar(300), trabajadorData.Direccion);
    db.pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), trabajadorData.Telefono1);
    db.pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), trabajadorData.Telefono2);
    db.pushAOJParam(aoj, 'FechaIngreso', sql.Date(), trabajadorData.FechaIngreso);
    // db.pushOutParam(aoj, 'IdTrabajador', sql.Int)
    db.storedProcExecute('USP_CREATE_TRABAJADOR', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function updateTrabajador(req, res) {
    var trabajadorData = matchedData(req, {locations: ['body', 'params']});
    var aoj = [];
    console.log(trabajadorData);
    db.pushAOJParam(aoj, 'IdTrabajador', sql.Int, trabajadorData.IdTrabajador);
    db.pushAOJParam(aoj, 'IdSucursal', sql.Int, trabajadorData.IdSucursal);
    db.pushAOJParam(aoj, 'IdCargo', sql.Int, trabajadorData.IdCargo);
    db.pushAOJParam(aoj, 'Nombres', sql.NVarChar(50), trabajadorData.Nombres);
    db.pushAOJParam(aoj, 'Apellidos', sql.NVarChar(50), trabajadorData.Apellidos);
    db.pushAOJParam(aoj, 'IdTipoDocumento', sql.Int, trabajadorData.IdTipoDocumento);
    db.pushAOJParam(aoj, 'Documento', sql.NVarChar(50), trabajadorData.Documento);
    db.pushAOJParam(aoj, 'Imagen', sql.NVarChar(50), trabajadorData.Imagen);
    db.pushAOJParam(aoj, 'FechaNacimiento', sql.Date, trabajadorData.FechaNacimiento);
    db.pushAOJParam(aoj, 'Direccion', sql.NVarChar(300), trabajadorData.Direccion);
    db.pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), trabajadorData.Telefono1);
    db.pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), trabajadorData.Telefono2);
    db.pushAOJParam(aoj, 'FechaIngreso', sql.Date(), trabajadorData.FechaIngreso);  
    db.storedProcExecute('USP_UPDATE_TRABAJADOR', aoj)
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json(
            (afectadas > 0) ? { success: 'Trabajador modificado con exito!' } : { failed: 'No se encontro el Trabajador solicitado!' })

    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}

function changeStateTrabajador(req, res) {
    let data = matchedData(req,{locations:['query','params','body']})
    var aoj = [];
    console.log('Changing state')
    db.pushAOJParam(aoj, 'IdTrabajador',    sql.Int, data.IdTrabajador);
    db.pushAOJParam(aoj, 'Habilitado',      sql.Bit, +data.Habilitado);
    db.storedProcExecute('USP_DISP_TRABAJADOR', aoj)
    .then((results) => {
        let afectadas = results.rowsAffected[0]
            let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
            res.status(200).json((afectadas > 0) ? { success: 'Trabajador '  + accion + ' con exito!' } : { failed: 'No se encontro el Trabajador solicitado!' })
            console.log('Trabajador cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
    });
}


module.exports = {
    createTrabajador,
    getTrabajadores,
    getTrabajadorById,
    updateTrabajador,
    changeStateTrabajador
}