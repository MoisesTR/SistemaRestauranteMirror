var sql = require('mssql')

function findUserName(pool,UserName){
   return  pool.request()
        .input('UserName',sql.NVarChar(50),UserName)
        .execute('USP_FIND_USER')
}
function createUser(pool,data){
    return pool.request()
        .input('IdRol',sql.Int,data.IdRol)
        .input('IdTrabajador',sql.IdTrabajador)
        .input('UserName',sql.NVarChar(50),data.UserName)
        .input('Correo',sql.NVarChar(100),data.Correo)
        .input('Password',sql.NVarChar(100),data.Password)
        .execute('USP_CREATE_USUARIO')
}
function getUsuarios(pool){
    return pool.request()
        .execute('USP_GET_USUARIOS')
}
module.exports={
    findUserName,
    createUser,
    getUsuarios
}