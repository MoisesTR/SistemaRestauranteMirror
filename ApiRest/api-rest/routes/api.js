var express = require('express')
const CategoriaController= require('../controllers/categoria')
const ClasificacionController = require('../controllers/clasificacion')
const EmpaqueController =require('../controllers/empaque')
const EnvaseController = require('../controllers/envase')
const ProveedorController = require('../controllers/proveedor')
const SubclasificacionController = require('../controllers/subclasificacion')

var Router = express.Router()

Router
    //Rutas categoria controller
    .get('/categoria/:IdCategoria(\\d+)',CategoriaController.getCategoriaById)
    .get('/categorias',CategoriaController.getCategorias)
    .post('/categoria',CategoriaController.createCategoria)
    .put('/categoria',CategoriaController.updateCategoria)
    //Rutas clasificacion controller
    .get('/clasificacion/:IdClasificacion(\\d+)',ClasificacionController.getClasificacionById)
    .get('/clasificaciones',ClasificacionController.getClasificaciones)
    .post('/clasificacion',ClasificacionController.createClasificacion)
    .put('/clasificacion',ClasificacionController.updateClasificacion)
    //Rutas empaque controller
    .get('/empaque/:IdEmpaque(\\d+)',EmpaqueController.getEmpaqueById)
    .get('/empaques',EmpaqueController.getEmpaques)
    .post('/empaque',EmpaqueController.createEmpaque)
    //Rutas envase controler
    .get('/envase/:IdEnvase(\\d+)',EnvaseController)
    .get('/envases',EnvaseController)
    .post('/envase')
    //Rutas proveedor Controller
    .get('/proveedor')
    .get('/proveedores')
    .post('/proveedor')
    //Rutas subclasificacion Controller
    .get('/subclasificacion')
    .get('/subclasificaciones')
    .post('/subclasificacion')