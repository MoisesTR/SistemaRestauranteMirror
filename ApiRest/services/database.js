const conSql = require('../config/mssqlConfig');
function pushAOJParam(aoj, name, type, value) {
	aoj[aoj.length] = {
		pName: name,
		pType: type,
		pData: value
	}
}
function storedProcExecute(spName, parametersJsonArray) {
    console.log('storedProcExec')
    return conSql.getConnectionPoolGlobal()
    .then(function(pool) {	
        console.log('Conecto');
        let request  = pool.request()
        for (var i = 0; i < parametersJsonArray.length; i++) {
            console.log(parametersJsonArray[i]);
            request.input(
                parametersJsonArray[i]['pName'],
                eval(parametersJsonArray[i]['pType']),
                parametersJsonArray[i]['pData']);
        }
        return request.execute(spName);			
    }).catch(function(err) {
        console.log("Connection Error: " + err);
        throw err
    })
}
function queryExecute(query, parametersJsonArray) {
    console.log('queryExecure');
    return conSql.getConnectionPoolGlobal()
    .then(function(pool) {	
        console.log('Conecto');
        let request  = pool.request();
        for (var i = 0; i < parametersJsonArray.length; i++) {
            console.log(parametersJsonArray[i]);
            request.input(
                parametersJsonArray[i]['pName'],
                eval(parametersJsonArray[i]['pType']),
                parametersJsonArray[i]['pData']);
        }
        return request.query(query);			
    }).catch(function(err) {
        console.log("Connection Error: " + err);
        throw err
    })
}
module.exports.storedProcExecute = storedProcExecute;
module.exports.pushAOJParam     = pushAOJParam;
module.exports.queryExecute     = queryExecute;