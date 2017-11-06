var querys = require('../querys/user')
var config = require('../config/mssqlConfig')

function finUserByUserName(req,res){
    var data = req.params
        config.getConnectionPoolGlobal().then((poolObt) => {
           return querys.findUser(poolObt,data.UserName)
        }).then((results) => {
           res.status(200).json({usuario:results.recordset[0]}) 
        }).catch((err) => {
            res.status(500).json(err)
        });
}
function getUsers(req,res){
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.getUsuarios(poolObt)  
    }).then((results) => {
        res.status(200).json({usuarios:results.recordset})
    }).catch((err) => {
        res.status(500).json(err)
    })
}
function createUser(req,res){
    let data = req.body
    config.getConnectionPoolGlobal().then((poolObt) => {
        return querys.createUser(poolObt,data)
    }).then((results) => {
        res.status(200).json({IdUsuario:results.recordset[0].IdUsuario})
    }).catch((err) => {
        res.status(500).json(err)
    })
}