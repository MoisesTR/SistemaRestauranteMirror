var sql = require('mssql')

function createCargo(pool,data){ 
    console.log(data);
    return pool.request()
        .input('NombreCargo',sql.NVarChar(50),data.NombreCargo)
        .input('DescripcionCargo',sql.NVarChar(100),data.DescripcionCargo)
        .execute('USP_CREATE_CARGO')
    } 
function getCargos(pool,Habilitado){
    return pool.request()
        .input('Habilitado',sql.Int,Habilitado)
        .execute('USP_GET_CARGOS');
}
function updateCargo(pool,data){
    return pool.request()
        .input('IdCargo',sql.Int,data.IdCargo)
        .input('NombreCargo',sql.NVarChar(50),data.NombreCargo)
        .input('DescripcionCargo',sql.NVarChar(100),data.DescripcionCargo)
        .execute('USP_UPDATE_CARGO')
}
function getCargoById(pool,IdCargo){
    return pool.request()
        .input('IdCargo',sql.Int,IdCargo)
        .execute('USP_GET_CARGO')
}
module.exports={
    createCargo,
    getCargos,
    updateCargo,
    getCargoById
}