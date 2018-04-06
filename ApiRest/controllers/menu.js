const db = require('../services/database');

function getMenus(req, res) {
    var aoj= [];
   db.storedProcExecute('USP_GET_MENUES', aoj).then((result) => {
       var jsonString = result.recordset[0];
        console.log(jsonString);
        var jas = 
        res.status(200).send(JSON.parse(jsonString))
    }).catch((err) => {
        console.log(err)
        console.dir(err)
        res.status(500).json(err)
    })
}
module.exports= {
    getMenus
}