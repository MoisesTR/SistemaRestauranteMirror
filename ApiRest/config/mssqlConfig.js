var sql = require('mssql')

const config = {
    user: 'usuario_node',
    password: 'node123',
    server: 'localhost',
    database: 'pruebas_node',
    port: '1433',
    parseJSON: true,
    options: {
        trustedConnection: false
    }
}
function getConnectionPoolGlobal(){
    function conect(resolve,reject){
        if (global.poolGlobal){
            console.log('Reutilizando pool '+poolGlobal.listenerCount())
            resolve(poolGlobal)
        }
        else{
            new sql.ConnectionPool(config).connect().then(poolObt=>{
                global.poolGlobal=poolObt
                resolve(global.poolGlobal)
                console.log('Nuevo pool Creado')
            }).catch(err =>{
                reject(err)
            })
        }      
    }
    return new Promise(conect)
}
module.exports = {
    config,
    getConnectionPoolGlobal
}