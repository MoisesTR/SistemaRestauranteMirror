const conSql = require('../config/mssqlConfig');
function pushAOJParam(aoj, name, type, value) {
	aoj[aoj.length] = {
        pClasf: 1,
		pName: name,
		pType: type,
		pData: value
	}
}
function pushOutParam(aoj, name, type) {
	aoj[aoj.length] = {
        pClasf: 2,
		pName: name,
		pType: type
	}
}
function storedProcExecuteServer(spName, parametersJsonArray) {
    return conSql.getConnectionPoolGlobalServer()
    .then(function(pool) {	
        console.log('Conecto');
        let request  = pool.request()
        for (var i = 0; i < parametersJsonArray.length; i++) {
            if(parametersJsonArray[i].pClasf == 1)
                request.input(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']),
                    parametersJsonArray[i]['pData']);
            else
                request.output(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']));
        }
       // console.dir(request.parameters)
        return request.execute(spName);			
    }).catch(function(err) {
        //console.log("Connection Error: " + err);
        throw err;
    })
}

function storedProcExecute(spName, parametersJsonArray) {
    console.log('storedProcExec')
    return conSql.getConnectionPoolGlobal()
    .then(function(pool) {	
        console.log('Conecto');
        let request  = pool.request()
        const tam = parametersJsonArray.length;
        for (var i = 0; i < tam; i++) {
            if(parametersJsonArray[i].pClasf == 1) {
                request.input(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']),
                    parametersJsonArray[i]['pData']);
            } else {
                request.output(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']));
            }
        }
        // console.dir(request)
        return request.execute(spName);			
    }).catch(function(err) {
        throw err
    })
}
function queryExecute(query, parametersJsonArray) {
    return conSql.getConnectionPoolGlobal()
    .then(function(pool) {	
        console.log('Conecto');
        let request  = pool.request();
        const tam = parametersJsonArray.length;
        for (var i = 0; i < tam; i++) {
            if(parametersJsonArray[i].pClasf == 1) {
                request.input(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']),
                    parametersJsonArray[i]['pData']);
            } else {
                request.output(
                    parametersJsonArray[i]['pName'],
                    eval(parametersJsonArray[i]['pType']));
                }
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
module.exports.pushOutParam     = pushOutParam;