var shortid = require('shortid');
var fs = require('fs');

function uploadImage(req, res) {

    var tipo = req.body.tipo;
    var imagenAntigua = req.body.imagenAntigua;
    var removioImagen = req.body.removioImagen == "true";

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            "message": 'Debe seleccionar una imagen'
        });

    }

    //Carpetas de imagenes validas
    var tiposValidos = ['productos', 'trabajadores', 'usuarios','temp'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            "message": 'Carpeta no encontrada'
        });
    }

    var pathViejo = `./uploads/${ tipo }/${ imagenAntigua }`;


        if (imagenAntigua != '') {
            //Si existe , elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);

            }
        }

        //Obtener nombre archivo
        var archivo = req.files.image;
        var nombreCortado = archivo.name.split('.');
        var extArchivo = nombreCortado[nombreCortado.length - 1].toLowerCase();

        //Extensiones de archivos permitidas
        var extensionesPermitidas = ['png', 'jpg', 'jpeg'];

        if (extensionesPermitidas.indexOf(extArchivo) < 0) {
            return res.status(400).json({
                "message": 'Las extensiones validas son ' + extensionesPermitidas.join(' , ')
            });
        }

        //Nombre de archivo personalizado
        var nombreArchivo = shortid.generate() + '.' + extArchivo;

        //Mover el archivo temporal a un path
        var path = `./uploads/${ tipo }/${ nombreArchivo }`;

        archivo.mv(path, err => {

            if (err) {
                return res.status(500).json({
                    "message": 'Error al mover el archivo',
                    "error": err
                });
            } else {
                return res.status(200).json({
                    "message": 'Peticion realizada correctamente',
                    "image": nombreArchivo,
                    "success" : true
                })
            }
        })

}

module.exports = {
    uploadImage
}