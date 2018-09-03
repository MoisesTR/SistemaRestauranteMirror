var express = require("express");
var router = express.Router();
var request = require("request");

router.get("/", function(req, res, next) {
  var shortid = req.query.shortid;
  var preview = JSON.parse(req.query.preview);
  var catalogoApi = req.query.catalogoApi;
  
  if (catalogoApi == "getFactura") {
    var IdFactura = req.query.IdFactura;
    var IdEstadoFactura = req.query.IdEstadoFactura;
    
    var data = {
      template: {
        shortid: shortid
      },
      options: {
        preview: preview
      },
      data: {
        catalogo: catalogoApi,
        IdFactura: IdFactura,
        IdEstadoFactura: IdEstadoFactura
      }
    };
    var options = {
      uri: "http://localhost:8001/api/report",
      method: "POST",
      json: data
    };
    request(options).pipe(res);

  } else {
      
    var data = {
      template: {
        shortid: shortid
      },
      options: {
        preview: preview
      },
      data: {
        catalogo: catalogoApi
      }
    };
    var options = {
      uri: "http://localhost:8001/api/report",
      method: "POST",
      json: data
    };
    request(options).pipe(res);
  }
});

module.exports = router;
