    var sql = require('sql')

    function getEnvases(pool){
        pool.request()
            .execute('USP_GET_ENVASES')
    }
    function createEnvase(pool)