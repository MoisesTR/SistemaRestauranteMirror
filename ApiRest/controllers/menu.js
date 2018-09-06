const db = require('../services/database');
const sql = require('mssql');
const { mssqlErrors } = require('../Utils/util');
const { matchedData } = require('express-validator/filter');

function createMenu(req, res) {
    var menuData = matchedData(req, { locations: 'body' });
    var aoj = [];
    db.pushOutParam(aoj, 'IdMenu', sql.Int);
    db.pushAOJParam(aoj, 'IdPadre', sql.Int, menuData.IdPadre);
    db.pushAOJParam(aoj, 'NombreM', sql.NVarChar(50), menuData.NombreM);
    db.pushAOJParam(aoj, 'DescripcionM', sql.NVarChar(150), menuData.DescripcionM);
    db.pushAOJParam(aoj, 'NOrden', sql.Int, menuData.NOrden);
    db.storedProcExecute('dbo.USP_INSERT_MENU', aoj)
        .then((result) => {

        }).catch((err) => {
            res.status(500).json(mssqlErrors(err))
        })
}

function updateMenu(req, res) {
    var menuData = matchedData(req, { locations: 'body' });
    var aoj = [];
    db.pushOutParam(aoj, 'IdMenu', sql.Int, menuData.IdMenu);
    db.pushAOJParam(aoj, 'IdPadre', sql.Int, menuData.IdPadre);
    db.pushAOJParam(aoj, 'NombreM', sql.NVarChar(50), menuData.NombreM);
    db.pushAOJParam(aoj, 'DescripcionM', sql.NVarChar(150), menuData.DescripcionM);
    db.pushAOJParam(aoj, 'NOrden', sql.Int, menuData.NOrden);
    db.storedProcExecute('dbo.USP_INSERT_MENU', aoj)
        .then((result) => {

        }).catch((err) => {
            res.status(500).json(mssqlErrors(err))
        })
}

function getMenus(req, res) {
    let data = matchedData(req);
    var aoj = [];

    db.pushAOJParam(aoj, 'IdRol', sql.Int, data.IdRol);
    db.storedProcExecute('USP_GET_MENUES', aoj).then((result) => {
        var jsonString = result.recordset[0];
        console.log(jsonString);
        jsonString.Menues = JSON.parse(jsonString.Menues);
        res.status(200).json(jsonString)
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
}
function getMenuesByRol(req, res) {
    let data = matchedData(req,{locations:['query','params']});
    var aoj = [];
    db.pushAOJParam(aoj,'IdRol',sql.Int,data.IdRol);
    console.log(data);
    db.storedProcExecute('USP_GET_MENUES', aoj).then((result) => {
        var jsonString = result.recordset[0];
        jsonString = JSON.parse(jsonString['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        res.status(200).json(jsonString)
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
}
module.exports = {
    getMenus,
    createMenu,
    updateMenu, 
    getMenuesByRol
}