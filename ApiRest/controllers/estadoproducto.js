var config = require('../config/mssqlConfig')
var querys = require('../querys/estadoproducto')

function getEstados(req,res){
    .execute('USP_GET_ESTADOSPRODUCTO')
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getEstados(poolObt)
    }).then((results) => {
        res.status(200).json({estados:results.recordset})
    }).catch((err) => {
        res.status(500).json(err)
    })
}
function getEstadoById(req,res){
    var IdEstado = req.params.IdEstado;
    .input('IdEstado',sql.Int,IdEstado)
        .execute('USP_GET_ESTADOPRODUCTO_BY_ID')
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getEstadoById(poolObt,IdEstado)
    }).then((results) => {
        res.status(200).json({ estado:results.recordset[0]})
    }).catch((err) => {
        res.status(500).json(err)
    })
}
module.exports={
    getEstadoById,
    getEstados
}