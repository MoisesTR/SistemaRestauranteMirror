const { param,body,check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

exports.validsParams = (req, res, next) => {
    let errors = validationResult(req);
    (!errors.isEmpty()) ? res.status(400).json(errors.array()): next();
}

exports.userSignUpValidation = [
        body('IdRol', 'IdRol es requerido y debe ser un entero').isInt(),
        body('IdTrabajador', 'IdTrabajador es requerido y debe ser un entero').isInt(),
        body('Username', 'username debe tener un minimo de 5 caracteres y maximo 40.').isLength({ min: 5, max: 40 }),
        body('Email', 'Campo email debe ser un Email').isEmail().optional({ nullable: true }),
        body('Imagen', 'Imagen debe ser un archivo').optional({ nullable: true }),
        body('Password', 'El password debe tener una longitud minima de 5 y maxima de 20').isLength({ min: 5, max: 20 }),
        sanitize('IdRol').toInt(),
        sanitize('IdTrabajador').toInt()
    ];

exports.userFindUsername = [
        body('Username', 'username debe tener un minimo de 5 caracteres y maximo 40.').isLength({ min: 5, max: 40 })
    ];

exports.userFindEmail = [
        check('Email', 'Campo Email no es una direccion de correo electronico valida!').isEmail()
    ];
    
exports.userSignInValidation = [
        check('Username', 'username debe tener un minimo de 5 caracteres y maximo 40.').isLength({ min: 5, max: 40 }),
        check('Password', 'El password debe tener una longitud minima de 5 y maxima de 20').isLength({ min: 5, max: 20 }),
        check('gettoken', 'gettoken debe ser un boleano').isBoolean().optional({ nullable: true }),
        sanitize('gettoken').toBoolean(),
        sanitize('Username').toString(),
        sanitize('Password').toString()
    ];

exports.userUpdate = [
        check('IdUsuario', 'IdUsuario debe ser un Entero!').isInt().optional({ nullable: false }),
        check('Username', 'username debe tener un minimo de 5 caracteres').isLength({ min: 5, max: 50 }),
        check('Password', 'password es requerido!').exists(),
        check('Password', 'El password debe tener una longitud minima de 8 y maxima de 20').isLength({ min: 4, max: 20 }),
        check('IdRol').optional({ nullable: true })
    ];

var categoriaCreate = [
        body('NombreCategoria', 'El nombre de la categoria es requerido').exists(),
        body('DescripcionCategoria', 'La descripcion de la categoria es requerida!').exists()
    ];

exports.categoriaCreate = categoriaCreate;

exports.updateCategoria = categoriaCreate.concat([
        check('IdCategoria').isInt(),
        sanitize('IdCategoria').toInt(),
    ]);

exports.changeStateCategoria = [
    check('IdCategoria').isInt(),
    check('Habilitado', 'Habilitado debe ser un booleano.').isBoolean()
];

var createCargo = [
    check('NombreCargo', 'El nombre del cargo es requerido!').exists(),
    check('DescripcionCargo', 'La descripcion del cargo es requerida!').exists(),
    sanitize('NombreCargo').toString()
];
exports.createCargo = createCargo;


exports.updateCargo = createCargo.concat([
    check('IdCargo').exists().isInt(),
]);

exports.changeStateCargo = [
    check('IdCargo').isInt(),
    check('Habilitado').isBoolean()
];

var createProveedor = [
    body('NombreProveedor').exists(),
    check('NombreProveedor', 'Ingrese el Nombre del proveedor.').exists(),
    check('Direccion', 'Ingrese la direccion del proveedor.').isAscii().trim(),
    check('Email','Ingrese el Email del Proveedor.').isEmail(),
    check('Descripcion').optional({nullable:true}),
    check('NombreRepresentante','Ingrese el Nombre del representante.').exists()
];
exports.createProveedor = createProveedor;

exports.updateProveedor = createProveedor.concat([
    param('IdProveedor', 'Seleccione el proveedor a actualizar.').isInt()
]);

exports.changeStateProveedor = [
        check('IdProveedor', 'Id de Proveedor requerido, debe ser entero.').isInt(),
        check('Habilitado', 'Habilitado es requerido y debe ser Bit.').isBoolean(),
        sanitize('Habilitado').toInt()
    ];

exports.createEntradaBodegaAP = [
    body('IdBodegaAreaP', 'Selecciona una Bodega de Area de Produccion').isInt(),
    body('IdTrabajador', 'Seleccione un Trabajador para ingresar la Factura.').isInt(),
    body('IdProveedor', 'Seleccione el Proveedor de la Factura.').isInt(),
    //check('IdEstadoEdicion').isInt(),
    body('NFactura').exists(),
    body('RepresentanteProveedor').exists(),
    body('PorcRetencion').isInt(),
    body('PorcIva').isInt(),
    body('PorcDescuento').isInt(),
    body('FechaHora').exists()
];

exports.editEntradaBodegaAP = [
    check('IdEntradaBodegaAP').isInt()
];

exports.crearFactura = [
    check('IdEntradaBodegaAP').isInt()
];
    
exports.detalleEntradaBodega = [
    check('IdEntradaBodegaAP').isInt(),
    check('IdProductoProveedor').isInt(),
    check('Cantidad').isInt(),
    check('PrecioUnitarioEntrada').isFloat(),
    check('DescuentoCalculado').isFloat()
];

var createProductoProveedor = [
    check('IdProducto').isInt(),
    check('IdProveedor').isInt(),
    body('IdEnvase').isInt().optional({nullable:true}),
    body('IdEmpaque', 'Debes seleccionar un empaque.').isInt().optional({nullable:true}),
    body('Costo','El costo es necesario!').isFloat(),
    body('CantidadEmpaque').isInt().optional({nullable:true}),
    body('IdUnidadMedida','Debes seleccionar una unidad de medida.').isInt(),
    body('ValorUnidadMedida').isNumeric(),
    check('DiasCaducidad').optional({ nullable: true }),
    sanitize('ValorUnidadMedida').toFloat()
];
exports.createProductoProveedor = createProductoProveedor;

var updateProductoProv = createProductoProveedor.slice(2,createProductoProveedor.length);

exports.updateProductoProv = updateProductoProv.concat([
    check('IdProductoProveedor', 'El id de la relacion producto proveedor es requerido!').isInt(),
    sanitize('IdProductoProveedor').toInt()    
]);

var createEnvase = [
    body('NombreEnvase', 'El nombre de envase es requerido!').isAscii().isLength({min: 3, max:50}),
    body('Descripcion', 'La descripcion debe tener una longitud maxima de 150 caracteres.').isAscii().optional({nullable:true}).isLength({max:150}),
    sanitize('NombreEnvase').toString(),
    sanitize('Descripcion').toString()
];
exports.createEnvase = createEnvase;

exports.updateEnvase = createEnvase.concat([
    param('IdEnvase', 'IdEnvase debe ser Entero').isInt(),
    sanitize('IdEnvase').toInt()
]); 

exports.createTrabajador = [
    check('IdSucursal', 'IdSucursal debe ser entero!').isInt(),
    body('IdCargo', 'IdCargo debe ser entero').isInt(),
    body('Nombres', 'Nombres debe tener un minimo de 4 y un maximo de 50').isLength({ min: 4, max: 50 }),
    body('Apellidos', 'Apellidos debe tener un minimo de 4 y un maximo de 50').isLength({ min: 4, max: 50 }),
    body('IdTipoDocumento', 'IdDocumento es requerido y debe ser entero').isInt(),
    body('Documento', 'Documento es necesario').isLength({ min: 4, max: 50 }),
    body('Imagen', 'Imagen es requerida').exists(),
    body('FechaNacimiento', 'FechaNacimiento debe ser una fecha').exists(),
    body('Direccion', 'Direccion debe tener un minimo de 10 y un maximo de 300').isLength({ min: 10, max: 300 }),
    body('Telefono1', 'EL primer telefono es requerido y debe tener 8 digitos!').isLength(8).isInt(),
    body('Telefono2', 'El Telefono2 debe tener una longitud de 8 digitos y ser numerico!').isInt().isLength(8),
    body('FechaIngreso', 'FechaIngreso es requerida!').exists(),
    sanitize('IdSucursal', 'IdSucursal debe ser entero').toInt(),
    sanitize('IdCargo', 'IdCargo debe ser entero').toInt()
];

exports.updateTrabajador = [
    check('IdTrabajador', 'IdTrabajador debe ser un entero!').exists().isInt(),
    sanitize('IdTrabajador').toInt()
];

exports.deleteTrabajador = [
    check('Habilitado', 'Habilitado es requerido y debe ser un boolean').isBoolean(),
    sanitize('Habilitado').toBoolean()
];

exports.createSucursalTelef = [
    body('IdSucursal', 'IdSucursal debe ser entero').isInt(),
    body('IdOperadora', 'IdOperadora debe ser entero').isInt(),
    body('NumeroTelefono', 'NumeroTelefono es requerido').exists(),
    sanitize('IdSucursal').toInt(),
    sanitize('IdOperadora').toInt()
];

var createEmpaque = [
    body('NombreEmpaque', 'Nombre de Empaque requerido').isAscii(),
    body('Descripcion'  , 'La descripcion debe ser texto!').isAscii().optional({nullable: true}),
    sanitize('NombreEmpaque').toString(),
    sanitize('Descripcion').toString()
];

exports.createEmpaque = createEmpaque;

exports.updateEmpaque = createEmpaque.concat([
    param('IdEmpaque', 'IdEmpaque debe ser Entero').isInt(),
    sanitize('IdEmpaque').toInt()
]);

var createClasificacion =  [
    body('NombreClasificacion','El nombre de la clasificacion es requerido, y no debe tener mas de 50 caracteres.').isAscii().isLength({max:50}),
    body('DescripcionClasificacion', 'La Descripcion no debe tener mas de 150 caracteres.').isAscii().optional({nullable:true}),
    body('IdCategoria', 'Id de la categoria es requerido!').isInt(),
    sanitize('IdCategoria').toInt(),
    sanitize('NombreClasificacion').toString()
];
exports.createClasificacion = createClasificacion;

exports.updateClasificacion = createClasificacion.concat([
    param('IdClasificacion').toInt().exists(),
    sanitize('IdClasificacion').toInt()
]);

var createRol = [
    body('NombreRol', 'El nombre del rol es requerido').isAscii().isLength({max: 50}),
    body('DescripcionRol','La Descripcion debe tener un maximo de 150 caracteres!').isLength({max:150}).optional({nullable: true}),
    sanitize('NombreRol').toString(),
    sanitize('DescripcionRol').toString()
];
exports.createRol = createRol;

exports.updateRol = createRol.concat([
    param('IdRol', 'Id del Rol es requerido!').isInt(),
    sanitize('IdRol').toInt()
])

var createProducto = [
    body('IdCategoria','Elige una Categoria para el producto.').isInt(),
    body('IdSubclasificacion', 'Selecciona Una SubClasificacion.').isInt(),
    body('IdEstado','Elige el estado del producto.').isInt(),
    body('NombreProducto','Ingresa el Nombre del Producto.').isAscii(),
    body('Descripcion','Ingresa la Descripcion del producto.').isAscii(),
    body('Imagen','Ingresa el nombre de la Imagen.').optional({nullable:true})
];
exports.createProducto = createProducto;

exports.updateProducto = createProducto.concat([
    param('IdProducto').isInt()
]);

let createUnidadMedida = [
    body('IdClasificacionUnidadMedida','Seleccione la clasificacion de la unidad de medida.').isInt().toInt(),
    body('NombreUnidad', 'Ingrese el nombre de la unidad de medida.').isAscii().isLength({max:50}),
    body('Simbolo','Ingrese el Simbolo de la Unidad de Medida.').isAscii().isLength({max:3}).toString(),
    body('NImportancia','Ingrese el valor de Importancia de esta Unidad de Medida.').isInt()
];
exports.createUnidadMedida = createUnidadMedida;

exports.updateUnidadMedida = createUnidadMedida.concat([
    param('IdUnidadMedida').isInt()
]);

exports.changeStateUnidadMedida =[
    param('IdUnidadMedida').isInt(),
    check('Habilitado').isInt()
]