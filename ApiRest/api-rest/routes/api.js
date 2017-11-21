var express = require('express')
const CategoriaController= require('../controllers/categoria')
const ClasificacionController = require('../controllers/clasificacion')
const EmpaqueController =require('../controllers/empaque')
const EnvaseController = require('../controllers/envase')
const ProveedorController = require('../controllers/proveedor')
const SubclasificacionController = require('../controllers/subclasificacion')
const EstadoProductoController = require('../controllers/estadoproducto')
const ProductoController = require('../controllers/producto')
const SucursalController = require('../controllers/sucursal')
const UnidadMedidaController = require('../controllers/unidadmedida');
const RoleController = require('../controllers/rol');
const ProductoProveedorController = require('../controllers/producto_proveedor')
const TrabajadorController = require('../controllers/trabajador');
const CargoController = require('../controllers/cargo')

const validations = require('../Utils/validations');
const jwt = require('../services/jwt')
const AuthController = require('../controllers/auth')

var Router = express.Router()
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/productos'});

Router
    .get('/',(req,res) => {
       res.status(200).json({
           isApi:true
       }) 
    })
    //Rutas categoria controller
    .get('/categoria/:IdCategoria(\\d+)',CategoriaController.getCategoriaById)
    .get('/categorias',CategoriaController.getCategorias)
    .post('/categoria',CategoriaController.createCategoria)
    .put('/categoria',CategoriaController.updateCategoria)
    .delete('/categoria/:IdCategoria(\\d+)',CategoriaController.changeStateCategoria)
    //Rutas clasificacion controller
    .get('/clasificacion/:IdClasificacion(\\d+)',ClasificacionController.getClasificacionById)
    .get('/clasificaciones',ClasificacionController.getClasificaciones)
    .post('/clasificacion',ClasificacionController.createClasificacion)
    .put('/clasificacion/:IdClasificacion(\\d+)',ClasificacionController.updateClasificacion)
    .delete('/clasificacion/:IdClasificacion(\\d+)',ClasificacionController.changeStateClasificacion)
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
    .put('/proveedor/:IdProveedor(\\d+)',ProveedorController.updateProveedor)
    .delete('/proveedor/:IdProveedor(\\d+)',ProveedorController.changeStateProveedor)

    //Rutas subclasificacion Controller
    .get('/subclasificacion/:IdSubclasificacion(\\d+)',SubclasificacionController.getSubclasificacionById)
    .get('/subclasificaciones',SubclasificacionController.getSubclasificaciones)
    .get('/subclasificaciones/:IdClasificacion(\\d+)',SubclasificacionController.getSubclasificacionesByIdClasificacion)
    .post('/subclasificacion',SubclasificacionController.createSubclasificacion)
	.put('/subclasificacion/:IdSubclasificacion(\\d+)',SubclasificacionController.updateSubclasificacion)
    .delete('/subclasificacion/:IdSubClasificacion(\\d+)',SubclasificacionController.changeStateSubClasificacion)
    //Rutas estadoproducto controller
    .get('/estadosproductos',EstadoProductoController.getEstados)
    .get('/estadoproducto/:IdEstado(\\d+)',EstadoProductoController.getEstadoById)
    //Rutas producto controller
    .get('/productos',ProductoController.getProductos)
    .get('/producto/:IdProducto(\\d+)',ProductoController.getProductoById)
    .post('/productoUploadImage',[md_upload],ProductoController.uploadImage)
    .get('/productoGetImage/:imageFile',ProductoController.getImageFile)
    .post('/producto',ProductoController.createProducto)
    .put('/producto/:IdProduco(\\d+)',ProductoController.updateProducto)
    .delete('/producto/:IdProducto(\\d+)',ProductoController.changeStateProducto)

    //Rutas sucursal Controller
    .get('/sucursales',SucursalController.getSucursales)
    .get('/sucursal/:IdSucursal(\\d+)',SucursalController.getSucursalById)
    .post('/sucursal',SucursalController.createSucursal)
    .post('/sucursal/:IdSucursal(\\d+)/telefono',SucursalController.createTelefonoSucursal)
    .get('/sucursal/:IdSucursal(\\d+)/telefono/:IdTelefonoSucursal(\\d+)',SucursalController.getTelefonoSucursal)
    .update('/sucursal/:IdSucursal(\\d+)/telefono/:IdTelefonoSucursal(\\d+)',SucursalController.updateTelefonoSucursal)
    .get('/sucursal/:IdSucursal(\\d+)/telefonos',SucursalController.getTelefonosBySucursalId)
    .put('/sucursal/:IdSucursal(\\d+)')
    //Rutas para unidad de Medida Controller
    .get('/unidadesmedida',UnidadMedidaController.getUnidadesMedida)
    .get('/unidadmedida/:IdUnidadMedida(\\d+)',UnidadMedidaController.getUnidadById)
    .post('/unidadmedida',UnidadMedidaController.createUnidadMedida)
    .put('/unidadmedida/:IdUnidadMedida(\\d+)',UnidadMedidaController.updateUDM)
    .delete('/unidadmedida/:IdUnidadMedida(\\d+)',UnidadMedidaController.changeStateUnidadMedida)
    //Rutas para Producto Proveedor
    .get('/productos/proveedores',ProductoProveedorController.getProductosProveedores)
    .get('/producto/proveedor/:IdProductoProveedor(\\d+)',ProductoProveedorController.getProductoProveedorById)
    .get('/productos/proveedor/:IdProveedor(\\d+)',ProductoProveedorController.getProductoProveedorById)
    .get('/producto/proveedores/:IdProducto(\\d+)',ProductoProveedorController.getProveedoresOfProducto)
    .post('/producto/proveedor',ProductoProveedorController.createProductoProveedor)
    .put('/producto/proveedor/:IdProductoProveedor(\\d+)',ProductoProveedorController.changeStateProductoProveedor)
    //.delete('/producto/proveedor')
    //Rutas para Rol Controller
    .post('/rol',RoleController.createRol)
    .get('/roles',RoleController.getRoles)
    .get('/rol/:IdRol(\\d+)',RoleController.getRolbyId)
    .put('/rol/:IdRol(\\d+)',RoleController.updateRol)

    /*********** faltan */
    //Rutas para Trabajador Controller
    .get('/trabajadores',TrabajadorController.getTrabajadores)
    .post('/trabajador',validations.createTrabajador,validations.validsParamas,TrabajadorController.createTrabajador)
    .get('/trabajador/:IdTrabajador(\\d+)',TrabajadorController.getTrabajadorById)
    .put('/trabajador/:IdTrabajador(\\d+)',validations.createTrabajador.concat(validations.updateTrabajador),validations.validsParamas,TrabajadorController.updateTrabajador)
    .delete('/trabajador/:IdTrabajador(\\d+)',validations.deleteTrabajador,validations.validsParamas,TrabajadorController.changeStateTrabajador)

    //Rutas Para Cargo Controller
    .get('/cargos',CargoController.getCargos)
    .post('/cargo',CargoController.createCargo)
    .get('/cargo/:IdCargo(\\d+)',CargoController.getCargoById)
    .put('/cargo/:IdCargo(\\d+)',CargoController.updateCargo)
    .delete('/cargo/:IdCargo(\\d+)',CargoController.changeStateCargo)

    //Rutas para 
    .post('/signup',validations.userSignUpValidation,validations.validsParamas,AuthController.signUp)
    .post('/signin',validations.userSignInValidation,validations.validsParamas,AuthController.singIn)
    .get('/users',AuthController.getUsers)
    .put('/update-user/:IdUsuario(\\d+)',validations.userSignInValidation,validations.userUpdate,validations.validsParamas,AuthController.updateUser)
    .delete('/user/:IdUsuario(\\d+)',AuthController.changeStateUser)    
    module.exports=Router
