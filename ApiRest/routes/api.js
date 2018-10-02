var express = require('express')
const CategoriaController       = require('../controllers/categoria')
const ClasificacionController   = require('../controllers/clasificacion')
const EmpaqueController         = require('../controllers/empaque')
const EnvaseController          = require('../controllers/envase')
const ProveedorController       = require('../controllers/proveedor')
const SubclasificacionController = require('../controllers/subclasificacion')
const EstadoProductoController  = require('../controllers/estadoproducto')
const ProductoController        = require('../controllers/producto')
const ImagenController          = require('../controllers/imagenes');
const UploadController          = require('../controllers/upload');
const SucursalController        = require('../controllers/sucursal')
const UnidadMedidaController    = require('../controllers/unidadmedida');
const RoleController            = require('../controllers/rol');
const ProductoProveedorController = require('../controllers/producto_proveedor')
const TrabajadorController      = require('../controllers/trabajador');
const CargoController           = require('../controllers/cargo')
const clasificacionUnidadMedidaController = require('../controllers/clasificacionudm')
const bodegaApController        = require('../controllers/bodegaAp');
const menuController            = require('../controllers/menu');
const validations               = require('../Utils/validations');
const jwt                       = require('../services/jwt');
const AuthController            = require('../controllers/auth');
const TipoDocIdentController    = require('../controllers/tipo_documento');
let   FactCompController        = require('../controllers/facturacion');

var Router = express.Router();


Router
    .get('/', (req, res) => {
        res.status(200).json({
            isApi: true
        })
    })
    //Rutas categoria controller
    .get('/categoria/:IdCategoria(\\d+)', CategoriaController.getCategoriaById)
    .get('/categorias', validations.Habilitado,validations.validsParams,CategoriaController.getCategorias)
    .post('/categoria', validations.createCategoria, validations.validsParams, CategoriaController.createCategoria)
    .put('/categoria/:IdCategoria(\\d+)',validations.updateCategoria,validations.validsParams, CategoriaController.updateCategoria)
    .delete('/categoria/:IdCategoria(\\d+)',validations.changeStateGeneric('IdCategoria'),validations.validsParams, CategoriaController.changeStateCategoria)
    //Rutas clasificacion controller
    .get('/clasificacion/:IdClasificacion(\\d+)', ClasificacionController.getClasificacionById)
    .get('/clasificaciones/:IdCategoria(\\d+)/:Habilitado(\\d+)', ClasificacionController.getClasificacionesByIdCategoria)
    .get('/clasificaciones',validations.Habilitado, validations.validsParams, ClasificacionController.getClasificaciones)
    .post('/clasificacion',validations.createClasificacion, validations.validsParams, ClasificacionController.createClasificacion)
    .put('/clasificacion/:IdClasificacion(\\d+)',validations.updateClasificacion, validations.validsParams, ClasificacionController.updateClasificacion)
    .delete('/clasificacion/:IdClasificacion(\\d+)',validations.changeStateGeneric('IdClasificacion'),validations.validsParams, ClasificacionController.changeStateClasificacion)
    //Rutas empaque controller
    .get('/empaque/:IdEmpaque(\\d+)', EmpaqueController.getEmpaqueById)
    .get('/empaques',validations.Habilitado, validations.validsParams, EmpaqueController.getEmpaques)
    .post('/empaque', validations.createEmpaque, validations.validsParams ,EmpaqueController.createEmpaque)
    .put('/empaque/:IdEmpaque(\\d+)', validations.updateEmpaque, validations.validsParams, EmpaqueController.updateEmpaque)
    .delete('/empaque/:IdEmpaque(\\d+)', validations.changeStateGeneric('IdEmpaque'), validations.validsParams, EmpaqueController.changeStateEmpaque)
    //Rutas envase controler
    .get('/envase/:IdEnvase(\\d+)', EnvaseController.getEnvaseById)
    .get('/envases',validations.Habilitado, validations.validsParams, EnvaseController.getEnvases)
    .post('/envase', validations.createEnvase, validations.validsParams, EnvaseController.createEnvase)
    .put('/envase/:IdEnvase(\\d+)', validations.updateEnvase, validations.validsParams, EnvaseController.updateEnvase)
    .delete('/envase/:IdEnvase(\\d+)', validations.changeStateGeneric('IdEnvase'), validations.validsParams, EnvaseController.changeStateEnvase)
    //Rutas proveedor Controller
    .get('/proveedor/:IdProveedor(\\d+)', ProveedorController.getProveedorById)
    .get('/proveedores',validations.Habilitado, validations.validsParams, ProveedorController.getProveedores)
    .post('/proveedor',validations.createProveedor, validations.validsParams, ProveedorController.createProveedor)
    .post('/proveedor/telefono',validations.createTelefonoProveedor, validations.validsParams, ProveedorController.createTelefonoProveedor)
    .put('/proveedor/:IdProveedor(\\d+)',validations.updateProveedor,validations.validsParams, ProveedorController.updateProveedor)
    .delete('/proveedor/:IdProveedor(\\d+)',validations.changeStateGeneric('IdProveedor'), validations.validsParams, ProveedorController.changeStateProveedor)
    .delete('/proveedor/telefono/:IdTelefono(\\d+)',validations.changeStateGeneric('IdTelefono'), validations.validsParams, ProveedorController.changeStateTelefonoProveedor)
    //Rutas subclasificacion Controller
    .get('/subclasificacion/:IdSubClasificacion(\\d+)', SubclasificacionController.getSubclasificacionById)
    .get('/subclasificaciones',validations.Habilitado, validations.validsParams, SubclasificacionController.getSubclasificaciones)
    .get('/subclasificaciones/:IdClasificacion(\\d+)', SubclasificacionController.getSubclasificacionesByIdClasificacion)
    .post('/subclasificacion', validations.createSubclasificacion,validations.validsParams,SubclasificacionController.createSubclasificacion)
    .put('/subclasificacion/:IdSubClasificacion(\\d+)',validations.updateSubclasificacion,validations.validsParams, SubclasificacionController.updateSubclasificacion)
    .delete('/subclasificacion/:IdSubClasificacion(\\d+)',validations.changeStateGeneric('IdSubClasificacion'), validations.validsParams, SubclasificacionController.changeStateSubClasificacion)
    //Rutas estadoproducto controller
    .get('/estadosproducto',validations.Habilitado, validations.validsParams, EstadoProductoController.getEstados)
    .get('/estadoproducto/:IdEstado(\\d+)', EstadoProductoController.getEstadoById)
    //Rutas producto controller
    .get('/productos',validations.Habilitado, validations.validsParams, ProductoController.getProductos)
    .get('/producto/:IdProducto(\\d+)', ProductoController.getProductoById)
    .post('/producto',validations.createProducto, validations.validsParams, ProductoController.createProducto)
    .put('/producto/:IdProducto(\\d+)',validations.updateProducto, validations.validsParams, ProductoController.updateProducto)
    .delete('/producto/:IdProducto(\\d+)',validations.changeStateGeneric('IdProducto'),validations.validsParams, ProductoController.changeStateProducto)

    .get('/getImage/:path/:ImageFile', ImagenController.getImageFile)
    .get('/getImagen/:tipo/:img', ImagenController.getImage)
    .post('/uploadImage', UploadController.uploadImage)
    .delete('/deleteImage/:tipo/:img',ImagenController.deleteImage)
    //Rutas sucursal Controller
    .get('/sucursales',validations.Habilitado, validations.validsParams, SucursalController.getSucursales)
    .get('/sucursal/:IdSucursal(\\d+)', SucursalController.getSucursalById)
    .post('/sucursal', validations.createSucursal, validations.validsParams,SucursalController.createSucursal)
    .put('/sucursal/:IdSucursal(\\d+)',validations.updateSucursal, validations.validsParams,SucursalController.updateSucursal)
    .delete('/sucursal/:IdSucursal(\\d+)',validations.changeStateGeneric('IdSucursal'), validations.validsParams, SucursalController.changeStateSucursal)
    //Rutas para unidad de Medida Controller
    .get('/unidadesmedida',validations.Habilitado,validations.validsParams, UnidadMedidaController.getUnidadesMedida)
    .get('/unidadmedida/:IdUnidadMedida(\\d+)', UnidadMedidaController.getUnidadById)
    .post('/unidadmedida',validations.createUnidadMedida,validations.validsParams, UnidadMedidaController.createUnidadMedida)
    .put('/unidadmedida/:IdUnidadMedida(\\d+)', validations.updateUnidadMedida,validations.validsParams,UnidadMedidaController.updateUnidadMedida)
    .delete('/unidadmedida/:IdUnidadMedida(\\d+)',validations.changeStateGeneric('IdUnidadMedida'),validations.validsParams, UnidadMedidaController.changeStateUnidadMedida)
    //Rutas para Producto Proveedor
    .get('/productos/proveedores', validations.Habilitado,validations.validsParams,ProductoProveedorController.getProductosProveedores)
    .get('/producto/proveedor/:IdProductoProveedor(\\d+)', ProductoProveedorController.getProductoProveedorById)
    .get('/productos/proveedor/:IdProveedor(\\d+)', ProductoProveedorController.getProductosByProveedorId)
    .get('/productos/proveedor/:IdProveedor(\\d+)/:IdFactura(\\d+)', ProductoProveedorController.getProductosByProveedorIdFiltrado)
    .get('/producto/proveedores/:IdProducto(\\d+)', ProductoProveedorController.getProveedoresOfProducto)
    .delete('/producto/proveedor/:IdProductoProveedor(\\d+)', validations.changeStateGeneric('IdProductoProveedor'),validations.validsParams,ProductoProveedorController.changeStateProductoProveedor)
    //.delete('/producto/proveedor')
    //Rutas para Rol Controller
    .post('/rol', validations.createRol, validations.validsParams, RoleController.createRol)
    .get('/roles', validations.Habilitado, validations.validsParams,RoleController.getRoles)
    .get('/rol/:IdRol(\\d+)', RoleController.getRolbyId)
    .put('/rol/:IdRol(\\d+)', validations.updateRol, validations.validsParams ,RoleController.updateRol)
    //Rutas clasificacionUnidadmedida controller
    .get('/clasificacionunidadmedida/:IdClasificacionUnidadMedida(\\d+)', clasificacionUnidadMedidaController.getClasificacionUdmById)
    .get('/clasificacionesunidadmedida', clasificacionUnidadMedidaController.getClasificacionesUdm)
    /*********** faltan */
    //Rutas para Trabajador Controller
    .get('/trabajadores', validations.Habilitado,validations.IdSucursal,validations.validsParams,TrabajadorController.getTrabajadores)
    .post('/trabajador', validations.createTrabajador, validations.validsParams, TrabajadorController.createTrabajador)
    .get('/trabajador/:IdTrabajador(\\d+)', TrabajadorController.getTrabajadorById)
    .put('/trabajador/:IdTrabajador(\\d+)', validations.createTrabajador.concat(validations.updateTrabajador), validations.validsParams, TrabajadorController.updateTrabajador)
    .delete('/trabajador/:IdTrabajador(\\d+)', validations.changeStateGeneric('IdTrabajador'), validations.validsParams, TrabajadorController.changeStateTrabajador)
    //Obtener tipos de documento
    .get('/tiposDocumento',validations.Habilitado,validations.validsParams, TipoDocIdentController.getTiposDocumento)
    .post('/tipoDocumento', validations.createTipoDocumentoI,validations.validsParams, TipoDocIdentController.createTipoDocumento)
    .put('/tipoDocumento/:IdTipoDocumento(\\d+)', validations.updateTipoDocumentoI,validations.validsParams, TipoDocIdentController.updateTipoDocumento)
    .delete('/tipoDocumento/:IdTipoDocumento(\\d+)', validations.changeStateGeneric('IdTipoDocumento'),validations.validsParams, TipoDocIdentController.changeStateTipoDocumento)
    //Rutas Para Cargo Controller
    .get('/cargos',validations.Habilitado,validations.validsParams, CargoController.getCargos)
    .post('/cargo', validations.createCargo, validations.validsParams, CargoController.createCargo)
    .get('/cargo/:IdCargo(\\d+)', CargoController.getCargoById)
    .put('/cargo/:IdCargo(\\d+)',validations.updateCargo, validations.validsParams, CargoController.updateCargo)
    .delete('/cargo/:IdCargo(\\d+)',validations.changeStateGeneric('IdCargo'),validations.validsParams, CargoController.changeStateCargo)
    //Rutas para Bodega Area Produccion
    .post('/entradabodegaap', validations.createEntradaBodegaAP, validations.validsParams, bodegaApController.createEntradaBodegaAp)
    .post('/detalleentradabodegaap', validations.detalleEntradaBodega, validations.validsParams, bodegaApController.createDetalleEntrada)
    .get('/detallebodegaap', bodegaApController.getDetalleBodegaAp)
    .put('/generarfactura/:IdEntradaBodegaAP(\\d+)', validations.crearFactura, validations.validsParams, bodegaApController.generarFactura)
    //Facturacion
    .post('/factComp', validations.createFacturaCompra, validations.validsParams,FactCompController.createFacturaCompra)
    .post('/detalleFactComp', validations.createDetalleFacturaCompra, validations.validsParams, FactCompController.createDetalleFacturaCompra)
    .get('/getFactura', validations.Habilitado,validations.getFacturaById,validations.validsParams ,FactCompController.getFacturaById)
    .get('/updateFactComp', validations.Habilitado,validations.updateFacturaCompra,validations.validsParams ,FactCompController.updateFacturaCompra)
    .get('/updateDetalleFactura', validations.Habilitado,validations.updateClasificacion,validations.validsParams ,FactCompController.updateDetalleFacturaCompra)
    .get('/getCambiosFactura', validations.Habilitado,validations.getCambiosFacturaById,validations.validsParams ,FactCompController.getCambiosFacturaById)
    .get('/listarfacturas', validations.Habilitado,validations.obtenerFacturasC,validations.validsParams ,FactCompController.obtenerFacturasCompra)
    //Rutas para 
    .post('/signup', validations.userSignUpValidation, validations.validsParams, AuthController.signUp)
    .post('/signupAdmin', validations.userSignUpValidationAdmin, validations.validsParams, AuthController.signUp)
    .post('/signin', validations.userSignInValidation, validations.validsParams, AuthController.singIn)
    .get('/users',validations.Habilitado,validations.validsParams, AuthController.getUsers)
    .put('/update-user/:IdUsuario(\\d+)', validations.userSignInValidation, validations.userUpdate, validations.validsParams, AuthController.updateUser)
    .delete('/user/:IdUsuario(\\d+)', AuthController.changeStateUser)
    
    //Rutas para los menues
    .post('/menu', menuController.createMenu)
    .get('/menu/:IdRol(\\d+)',validations.getMenuesByRol,menuController.getMenuesByRol)

module.exports = Router