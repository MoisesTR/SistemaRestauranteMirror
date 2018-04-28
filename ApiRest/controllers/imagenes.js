var fs = require('fs');
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

module.exports = {
    getImageFile
}