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
    .get('/envase/:IdEnvase(\\d+)',EnvaseController.getEnvaseById)
    .get('/envases',EnvaseController.getEnvases)
    .post('/envase',EnvaseController.createEnvase)
    //Rutas proveedor Controller
    .get('/proveedor/:IdProveedor(\\d+)',ProveedorController.getProveedorById)
    .get('/proveedores',ProveedorController.getProveedores)
    .post('/proveedor',ProveedorController.createProveedor)
    .put('/proveedor',ProveedorController.updateProveedor)
    //Rutas subclasificacion Controller
    .get('/subclasificacion/:IdSubclasificacion(\\d+)',SubclasificacionController.getSubclasificacionById)
    .get('/subclasificaciones',SubclasificacionController.getSubclasificaciones)
    .post('/subclasificacion',SubclasificacionController.createSubclasificacion)
    .put('/subclasificacion',SubclasificacionController.updateSubclasificacion)

    module.exports=Router