function createCambDolarParalelo(req, res) {
    let aoj = [];
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.storedProcExecute('',aoj)
    .then((result) => {
        
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}
function obtenerCambDolar(req, res) {
    let aoj = [];
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.pushAOJParam(aoj, '', sql.,data);
    db.storedProcExecute('',aoj)
    .then((result) => {
        
    })
    .catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}

module.exports ={
    createCambDolarParalelo,
    obtenerCambDolar
}