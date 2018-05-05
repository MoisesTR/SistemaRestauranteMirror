const fs = require('fs');
var path = require('path');

function getImageFile(req, res) {
    var imageFile = req.params.ImageFile;
    var pathImage = req.params.path;
    var path_file = './uploads/' + pathImage + '/' + imageFile;

    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(404).send({ message: 'La imagen no existe' });
        }
    });

}

function getImage(req, res) {
    var tipo = req.params.tipo;
    var img = req.params.img;

    var pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        var pathNoImagen = path.resolve(__dirname, '../uploads/temp/no-img.jpg')
        res.sendFile(pathNoImagen);
    }

}

function deleteImage(req,res) {
    var tipo = req.params.tipo;
    var img = req.params.img;

     //Carpetas de imagenes validas
     var tiposValidos = ['productos', 'trabajadores', 'usuarios','temp'];

     if (tiposValidos.indexOf(tipo) < 0) {
         return res.status(400).json({
            "ok": false,
             "message": 'Carpeta no encontrada'
         });
     }

     var path = `./uploads/${ tipo }/${ img }`;

    
       if (fs.existsSync(path)) {
            fs.unlink(path);

           return res.status(200).json({
                "message": 'Peticion realizada correctamente',
                "image": '',
                "success" : true
            });
       }  else {
            return res.status(400).json({
                "ok": false,
                "message": 'La imagen a remover no existe en la carpeta'
            });
       }

}

module.exports = {
    getImageFile,
    getImage,
    deleteImage
}