var shortid = require('shortid');
var fs = require('fs');

function uploadImage(req, res) {

    var tipo = req.body.tipo;
    var imagenAntigua = req.body.imagenAntigua;
    var removioImagen = req.body.removioImagen == "true";

    if (!req.files && !removioImagen) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se ha seleccionado la imagen',
            error: { message: 'Debe seleccionar una imagen' }
        });

    }

    //Carpetas de imagenes validas
    var tiposValidos = ['productos', 'trabajadores', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de coleccion no valida',
            error: { message: 'Carpeta no encontrada' }
        });
    }

    var pathViejo = `./uploads/${ tipo }/${ imagenAntigua }`;

    if (!removioImagen) {

        if (imagenAntigua != '') {
            //Si existe , elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);

            }
        }

        //Obtener nombre archivo
        var archivo = req.files.image;
        var nombreCortado = archivo.name.split('.');
        var extArchivo = nombreCortado[nombreCortado.length - 1];

        //Extensiones de archivos permitidas
        var extensionesPermitidas = ['png', 'jpg', 'jpeg'];

        if (extensionesPermitidas.indexOf(extArchivo) < 0) {
            return res.status(400).json({
                mensaje: 'Extension no válida',
                error: { message: 'Las extensiones validas son ' + extensionesPermitidas.join(' , ') }
            });
        }

        //Nombre de archivo personalizado
        var nombreArchivo = shortid.generate() + '.' + extArchivo;

        //Mover el archivo temporal a un path
        var path = `./uploads/${ tipo }/${ nombreArchivo }`;

        archivo.mv(path, err => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    mensaje: 'Error el mover el archivo',
                    error: err
                });
            } else {
                res.status(200).json({
                    mensaje: 'Peticion realizada correctamente',
                    image: nombreArchivo
                })
            }
        })

    } else {

        if (imagenAntigua != '') {
            //Si existe , elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
                res.status(200).json({
                    mensaje: 'Peticion realizada correctamente',
                    image: ''
                })

            }
        }

    }
}

module.exports = {
    uploadImage
}