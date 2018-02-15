var querys = require('../querys/rol')
var config = require('../config/mssqlConfig')

function createRol(req,res){ 
    var data = req.body;
    .input('NombreRol',sql.NVarChar(50),data.NombreRol)
        .input('DescripcionRol',sql.NVarChar(150),data.DescripcionRol)
        .execute('USP_CREATE_ROL_USUARIO')
      console.log('mandaste los campos')
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.createRol(poolObt,data)
        }).then((results) => {
            res.status(200).json(results.recordset[0])
        }).catch((err) => {
            res.status(500).json(err)
        })
}
function getRoles(req,res){
    let Habilitado = req.query.Habilitado;
    .input('Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_ROLES');
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getRoles(poolObt,Habilitado);
    }).then((results) => {
        res.status(200).json({
            roles:results.recordset
        })
    }).catch((err) => {
        res.status(500).json(err)
    });
}
function getRolbyId(req,res){
    var IdCargo = req.params.IdCargo;
    .input('IdRol',sql.Int,IdRol)
        .execute('USP_GET_ROL') 
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getRolById(poolObt,IdRol);
    }).then((results) => {
        res.status(200).json({
            rol:results.recordset
        })
    }).catch((err) => {
    });
    res.status(500).json(err)
}
function updateRol(req,res){
    var data = req.body;
    .input('IdRol',sql.Int,data.IdRol)
        .input('NombreRol',sql.NVarChar(50),data.NombreRol)
        .input('DescripcionRol',sql.NVarChar(150),data.DescripcionRol)
        .execute('USP_UPDATE_ROL')
    if(data.IdRol != undefined && data.NombreRol != undefined && data.DescripcionRol != undefined){
        config.getConnectionPoolGlobal().then((poolObt) => {
            return querys.updaterol(poolObt,data)
        }).then((results) => {
            res.status(200).json({
                success:'rol Actualizada Exitosamente!'
            })
        }).catch((err) => {
            res.status(500).json(err)
        });
    }else{
        res.status(401).send({
            error:true,
            code:'EPARAMS',
            message:'Para actualizar envie correctamente los parametros!'
        })
    }
}

module.exports={
    createRol,
    getRoles,
    getRolbyId,
    updateRol
}