var express = require('express')
const CategoriaController = require('../controllers/categoria')
const ClasificacionController = require('../controllers/clasificacion')
const EmpaqueController = require('../controllers/empaque')
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
const clasificacionUnidadMedidaController = require('../controllers/clasificacionudm')
const bodegaApController = require('../controllers/bodegaAp')

const validations = require('../Utils/validations');
const jwt = require('../services/jwt')
const AuthController = require('../controllers/auth')

var Router = express.Router()
var multipart = require('connect-multiparty');
var md_upload_producto = multipart({ uploadDir: './uploads/productos' });
var md_upload_trabajador = multipart({ uploadDir: './uploads/trabajadores' });

Router
    .get('/', (req, res) => {
        res.status(200).json({
            isApi: true
        })
    })
    //Rutas categoria controller
    .get('/categoria/:IdCategoria(\\d+)', CategoriaController.getCategoriaById)
    .get('/categorias', CategoriaController.getCategorias)
    .post('/categoria', CategoriaController.createCategoria)
    .put('/categoria', CategoriaController.updateCategoria)
    .delete('/categoria/:IdCategoria(\\d+)', CategoriaController.changeStateCategoria)
    //Rutas clasificacion controller
    .get('/clasificacion/:IdClasificacion(\\d+)', ClasificacionController.getClasificacionById)
    .get('/clasificaciones', ClasificacionController.getClasificaciones)
    .post('/clasificacion', ClasificacionController.createClasificacion)
    .put('/clasificacion', ClasificacionController.updateClasificacion)
    .delete('/clasificacion/:IdClasificacion(\\d+)', ClasificacionController.changeStateClasificacion)
    //Rutas empaque controller
    .get('/empaque/:IdEmpaque(\\d+)', EmpaqueController.getEmpaqueById)
    .get('/empaques', EmpaqueController.getEmpaques)
    .post('/empaque', EmpaqueController.createEmpaque)
    //Rutas envase controler
    .get('/envase/:IdEnvase(\\d+)', EnvaseController.getEnvaseById)
    .get('/envases', EnvaseController.getEnvases)
    .post('/envase', EnvaseController.createEnvase)
    //Rutas proveedor Controller
    .get('/proveedor/:IdProveedor(\\d+)', ProveedorController.getProveedorById)
    .get('/proveedores', ProveedorController.getProveedores)
    .post('/proveedor', ProveedorController.createProveedor)
    .put('/proveedor', ProveedorController.updateProveedor)
    .delete('/proveedor/:IdProveedor(\\d+)', ProveedorController.changeStateProveedor)

//Rutas subclasificacion Controller
.get('/subclasificacion/:IdSubclasificacion(\\d+)', SubclasificacionController.getSubclasificacionById)
    .get('/subclasificaciones', SubclasificacionController.getSubclasificaciones)
    .get('/subclasificaciones/:IdClasificacion(\\d+)', SubclasificacionController.getSubclasificacionesByIdClasificacion)
    .post('/subclasificacion', SubclasificacionController.createSubclasificacion)
    .put('/subclasificacion', SubclasificacionController.updateSubclasificacion)
    .delete('/subclasificacion/:IdSubClasificacion(\\d+)', SubclasificacionController.changeStateSubClasificacion)
    //Rutas estadoproducto controller
    .get('/estadosproductos', EstadoProductoController.getEstados)
    .get('/estadoproducto/:IdEstado(\\d+)', EstadoProductoController.getEstadoById)
    //Rutas producto controller
    .get('/productos', ProductoController.getProductos)
    .get('/producto/:IdProducto(\\d+)', ProductoController.getProductoById)
    .post('/productoUploadImage', [md_upload_producto], ProductoController.uploadImage)
    .get('/productoGetImage/:imageFile', ProductoController.getImageFile)
    .post('/producto', ProductoController.createProducto)
    .put('/producto', ProductoController.updateProducto)
    .delete('/producto/:IdProducto(\\d+)', ProductoController.changeStateProducto)

//Rutas sucursal Controller
.get('/sucursales', SucursalController.getSucursales)
    .get('/sucursal/:IdSucursal(\\d+)', SucursalController.getSucursalById)
    .post('/sucursal', SucursalController.createSucursal)
    .post('/sucursal/:IdSucursal(\\d+)/telefono', SucursalController.createTelefonoSucursal)
    .get('/sucursal/:IdSucursal(\\d+)/telefono/:IdTelefonoSucursal(\\d+)', SucursalController.getTelefonoSucursal)
    .get('/sucursales/telefonos', SucursalController.getTelefonosSucursales)
    .put('/sucursal/:IdSucursal(\\d+)/telefono/:IdTelefonoSucursal(\\d+)', SucursalController.updateTelefonoSucursal)
    .get('/sucursal/:IdSucursal(\\d+)/telefonos', SucursalController.getTelefonosBySucursalId)
    .put('/sucursal/:IdSucursal(\\d+)')
    //Rutas para unidad de Medida Controller
    .get('/unidadesmedida', UnidadMedidaController.getUnidadesMedida)
    .get('/unidadmedida/:IdUnidadMedida(\\d+)', UnidadMedidaController.getUnidadById)
    .post('/unidadmedida', UnidadMedidaController.createUnidadMedida)
    .put('/unidadmedida', UnidadMedidaController.updateUDM)
    .delete('/unidadmedida/:IdUnidadMedida(\\d+)', UnidadMedidaController.changeStateUnidadMedida)
    //Rutas para Producto Proveedor
    .get('/productos/proveedores', ProductoProveedorController.getProductosProveedores)
    .get('/producto/proveedor/:IdProductoProveedor(\\d+)', ProductoProveedorController.getProductoProveedorById)
    .get('/productos/proveedor/:IdProveedor(\\d+)', ProductoProveedorController.getProductoProveedorById)
    .get('/producto/proveedores/:IdProducto(\\d+)', ProductoProveedorController.getProveedoresOfProducto)
    .post('/producto/proveedor', validations.createProductoProveedor, validations.validsParams, ProductoProveedorController.createProductoProveedor)
    .put('/producto/proveedor', ProductoProveedorController.changeStateProductoProveedor)
    //.delete('/producto/proveedor')
    //Rutas para Rol Controller
    .post('/rol', RoleController.createRol)
    .get('/roles', RoleController.getRoles)
    .get('/rol/:IdRol(\\d+)', RoleController.getRolbyId)
    .put('/rol', RoleController.updateRol)
    //Rutas clasificacionUnidadmedida controller
    .get('/clasificacionunidadmedida/:IdClasificacionUnidadMedida(\\d+)', clasificacionUnidadMedidaController.getClasificacionUdmById)
    .get('/clasificacionesunidadmedida', clasificacionUnidadMedidaController.getClasificacionesUdm)
    /*********** faltan */
    //Rutas para Trabajador Controller
    .get('/trabajadores', TrabajadorController.getTrabajadores)
    .post('/trabajador', validations.createTrabajador, validations.validsParams, TrabajadorController.createTrabajador)
    .get('/trabajador/:IdTrabajador(\\d+)', TrabajadorController.getTrabajadorById)
    .put('/trabajador', validations.createTrabajador.concat(validations.updateTrabajador), validations.validsParams, TrabajadorController.updateTrabajador)
    .delete('/trabajador/:IdTrabajador(\\d+)', validations.deleteTrabajador, validations.validsParams, TrabajadorController.changeStateTrabajador)
    .post('/trabajadorUploadImage', [md_upload_trabajador], TrabajadorController.uploadImage)
    .get('/trabajadorGetImage/:imageFile', TrabajadorController.getImageFile)

//Rutas Para Cargo Controller
.get('/cargos', CargoController.getCargos)
    .post('/cargo', validations.createCargo, validations.validsParams, CargoController.createCargo)
    .get('/cargo/:IdCargo(\\d+)', CargoController.getCargoById)
    .put('/cargo', CargoController.updateCargo)
    .delete('/cargo/:IdCargo(\\d+)', CargoController.changeStateCargo)

//Rutas para Bodega Area Produccion
.post('/entradabodegaap', validations.createEntradaBodegaAP, validations.validsParams, bodegaApController.createEntradaBodegaAp)
    .post('/detalleentradabodegaap', validations.detalleEntradaBodega, validations.validsParams, bodegaApController.createDetalleEntrada)
    .get('/detallebodegaap', bodegaApController.getDetalleBodegaAp)
    .put('/generarfactura/:IdEntradaBodegaAP(\\d+)', validations.crearFactura, validations.validsParams, bodegaApController.generarFactura)
    .get('/listarfacturas', )
    //Rutas para 
    .post('/signup', validations.userSignUpValidation, validations.validsParams, AuthController.signUp)
    .post('/signin', validations.userSignInValidation, validations.validsParams, AuthController.singIn)
    .get('/users', AuthController.getUsers)
    .put('/update-user/:IdUsuario(\\d+)', validations.userSignInValidation, validations.userUpdate, validations.validsParams, AuthController.updateUser)
    .delete('/user/:IdUsuario(\\d+)', AuthController.changeStateUser)


module.exports = Router