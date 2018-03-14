function addErrorCode(errores) {
    errores.error = true;
    errores.code = "BADPARAMS";
    return errores;
}

function postValidator(req, res, next) {
    let errores = validationResult(req).mapped();
    (errores) ? res.status(400).json({ errors: errores }): next();
}

function mssqlErrors(err) {
    return {
        "showMessage" : (err.number == 50000) ? true : false,
        "code": err.code,
        "name": err.name,
        "number": err.number,
        "message": ((err.message) ? err.message : (err.originalError.message) ? err.originalError.message : err.originalError.info.message)
    }
}
module.exports = {
    addErrorCode,
    postValidator,
    mssqlErrors
}