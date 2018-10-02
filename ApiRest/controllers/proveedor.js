const db = require('../services/database');
const sql = require('mssql');
const { mssqlErrors } = require('../Utils/util');
const { matchedData } = require('express-validator/filter')

function getProveedorById(req, res) {
    const data = req.params;
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int, data.IdProveedor)
    db.storedProcExecute('USP_GET_PROVEEDOR', aoj)
        .then((results) => {
            res.status(200).json({ proveedor: results.recordset[0] })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function getProveedores(req, res) {
    var aoj = [];
    var data = matchedData(req, {locations:['query']})
    console.log('Proveedores');
    db.pushAOJParam(aoj, 'Habilitado', sql.Int, +data.Habilitado)
    db.storedProcExecute('USP_GET_PROVEEDORES', aoj)
        .then((results) => {
            res.status(200).json({ proveedores: results.recordset })
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function createProveedor(req, res) {
    var data = matchedData(req);
    var aoj = [];
    db.pushAOJParam(aoj, 'NombreProveedor', sql.NVarChar(50), data.NombreProveedor);
    db.pushAOJParam(aoj, 'Direccion', sql.NVarChar(200), data.Direccion);
    db.pushAOJParam(aoj, 'Email', sql.NVarChar(100), data.Email);
    db.pushAOJParam(aoj, 'Descripcion', sql.NVarChar(200), data.Descripcion)
    db.pushAOJParam(aoj, 'NombreRepresentante', sql.NVarChar(200), data.NombreRepresentante)
    db.pushAOJParam(aoj, 'Documento', sql.NVarChar(50), data.Documento)
    db.pushAOJParam(aoj, 'Telefono1', sql.NVarChar(20), data.Telefono1)
    db.pushAOJParam(aoj, 'Telefono2', sql.NVarChar(20), data.Telefono2)
    db.pushAOJParam(aoj, 'Retencion2', sql.Bit, data.Retencion2)
    db.pushAOJParam(aoj, 'Mercado', sql.Bit, data.Mercado)
    db.storedProcExecute('USP_CREATE_PROVEEDOR', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function updateProveedor(req, res) {
    var data = matchedData(req, {locations: ['body','params']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int, data.IdProveedor)
    db.pushAOJParam(aoj, 'NombreProveedor', sql.NVarChar(50), data.NombreProveedor);
    db.pushAOJParam(aoj, 'Direccion', sql.NVarChar(200), data.Direccion);
    db.pushAOJParam(aoj, 'Email', sql.NVarChar(100), data.Email);
    db.pushAOJParam(aoj, 'Descripcion', sql.NVarChar(200), data.Descripcion)
    db.pushAOJParam(aoj, 'NombreRepresentante', sql.NVarChar(200), data.NombreRepresentante)
    db.pushAOJParam(aoj, 'Documento', sql.NVarChar(20), data.Documento)
    db.pushAOJParam(aoj, 'Telefono1', sql.NVarChar(200), data.Telefono1)
    db.pushAOJParam(aoj, 'Telefono2', sql.NVarChar(200), data.Telefono2)
    db.pushAOJParam(aoj, 'Retencion2', sql.Int, data.Retencion2)
    db.storedProcExecute('USP_UPDATE_PROVEEDOR', aoj)
        .then((results) => {
            let afectadas = results.rowsAffected[0];
            res.status(200).json((afectadas > 0) ? { success: 'Proveedor modificado con exito!' } : { failed: 'No se encontro el Proveedor solicitado!' })
        
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function changeStateProveedor(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int(), data.IdProveedor);
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit(), +data.Habilitado);
    db.storedProcExecute('USP_DISP_PROVEEDOR', aoj).then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? { success: 'Proveedor ' + accion + ' con exito!' } : { failed: 'No se encontro el proveedor solicitado!' })
        console.log('Proveedor cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}

function createTelefonoProveedor(req,res) {
    let data = matchedData(req, {locations:['query','params','body']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdProveedor', sql.Int(), data.IdProveedor);
    db.pushAOJParam(aoj, 'Nombre', sql.NVarChar(50), data.Nombre);
    db.pushAOJParam(aoj, 'Cargo', sql.NVarChar(50), data.Cargo);
    db.pushAOJParam(aoj, 'Telefono', sql.NVarChar(15), data.Telefono);
    db.storedProcExecute('USP_CREATE_TELEFONO_PROVEEDOR', aoj)
        .then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(mssqlErrors(err));
        });
}

function changeStateTelefonoProveedor(req, res) {
    let data = matchedData(req, {locations:['query','params','body']});
    var aoj = [];
    db.pushAOJParam(aoj, 'IdTelefono', sql.Int(), data.IdProveedor);
    db.pushAOJParam(aoj, 'Habilitado', sql.Bit(), +data.Habilitado);
    db.storedProcExecute('USP_DISP_TELEFONO_PROVEEDOR', aoj).then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? { success: 'Telefono ' + accion + ' con exito!' } : { failed: 'No se encontro el telefono solicitado!' })
        console.log('Proveedor cambiado de estado con exito!')
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}


module.exports = {
    createProveedor,
    getProveedorById,
    getProveedores,
    updateProveedor,
    changeStateProveedor,
    createTelefonoProveedor,
    changeStateTelefonoProveedor
}
