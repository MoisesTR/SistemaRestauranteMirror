function beforeRender(req, res, done) {
    require('request')({
        //getFactura?IdFactura=3&IdEstadoFactura=2
      url:"http://localhost:3000/api/"+ req.data.catalogo + "?IdFactura=" + req.data.IdFactura + "&IdEstadoFactura=" + req.data.IdEstadoFactura,
      json:true
    }, function(err, res, body){
        console.log(body);
        req.data = Object.assign({}, req.data, body);
        done();
    });
    
}