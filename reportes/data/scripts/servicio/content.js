function beforeRender(req, res, done) {
    require('request')({
      url:"http://localhost:3000/api/"+ req.data.catalogo,
      json:true
    }, function(err, res, body){
        req.data = Object.assign({}, req.data, body);
        done();
    });
    
}