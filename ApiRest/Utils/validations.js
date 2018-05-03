const { body,check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

exports.validsParams = (req, res, next) => {
    let errors = validationResult(req);
    (!errors.isEmpty()) ? res.status(400).json(errors.array()): next();
}

exports.userSignUpValidation = [
        check('IdRol', 'IdRol es requerido y debe ser un entero').isInt(),
        check('IdTrabajador', 'IdTrabajador es requerido y debe ser un entero').isInt(),
        check('Username', 'username debe tener un minimo de 5 caracteres y maximo 40.').isLength({ min: 5, max: 40 }),
        check('Email', 'Campo email debe ser un Email').isEmail().optional({ nullable: true }),
        check('Imagen', 'Imagen debe ser un archivo').optional({ nullable: true }),
        check('Password', 'El password debe tener una longitud minima de 5 y maxima de 20').isLength({ min: 5, max: 20 }),
        sanitize('IdRol').toInt(),
        sanitize('IdTrabajador').toInt()
    ];

exports.userFindUsername = [
        check('Username', 'username debe tener un minimo de 5 caracteres y maximo 40.').isLength({ min: 5, max: 40 })
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

exports.categoriaCreate = [
        check('NombreCategoria', 'El nombre de la categoria es requerido').exists(),
        check('DescripcionCategoria', 'La descripcion de la categoria es requerida!').exists()
    ];
exports.updateCategoria = [
        check('IdCategoria').isInt(),
        check('Nombre', 'Nombre es requerido').exists(),
        check('Descripcion').exists()
    ];

exports.changeStateCategoria = [
        check('IdCategoria').isInt(),
        check('Habilitado', 'Habilitado debe ser un booleano.').isBoolean()
    ];

exports.createCargo = [
        check('NombreCargo', 'El nombre del cargo es requerido!').exists(),
        check('DescripcionCargo', 'La descripcion del cargo es requerida!').exists(),
        sanitize('NombreCargo').toString()
    ];

exports.updateCargo = [
        check('IdCargo').exists().isInt(),
    ];

exports.changeStateCargo = [
        check('Habilitado').isBoolean()
    ];

exports.createProveedor = [
        check('NombreProveedor').exists(),
        check('Direccion').exists(),
        check('Email'),
        check('Descripcion'),
        check('NombreRepresentante').exists()
    ];

exports.updateProveedor = [
        check('IdProveedor').isInt(),
        check('NombreProveedor').exists(),
        check('Direccion').isAlpha("es-ES").trim(),
        check('Email').islen,
        check('Descripcion'),
        check('NombreRepresentante').exists()
    ];

exports.changeStateProveedor = [
        check('IdProveedor').exists(),
        check('Habilitado').isBoolean()
    ];

exports.createEntradaBodegaAP = [
        check('IdBodegaAreaP').isInt(),
        check('IdTrabajador').isInt(),
        check('IdProveedor').isInt(),
        //check('IdEstadoEdicion').isInt(),
        check('NFactura').exists(),
        check('RepresentanteProveedor').exists(),
        check('PorcRetencion').isInt(),
        check('PorcIva').isInt(),
        check('PorcDescuento').isInt(),
        check('FechaHora').exists()
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

exports.createEnvase = [
    check('NombreEnvase', 'El nombre de envase es requerido!').isAscii(),
    check('Descripcion', 'La descripcion debe tener una longitud maxima de 150 caracteres.').isAscii(),
    sanitize('NombreEnvase').toString(),
    sanitize('Descripcion').toString()
];

exports.updateEnvase = [
    check('IdEnvase', 'IdEnvase debe ser Entero').isInt(),
    check('NombreEnvase').isLength({ min: 3, max: 50 }),
    check('Descripcion').isLength({ max: 150 }).optional({ nullable: true }),
    sanitize('NombreEnvase').toString().trim(),
    sanitize('Descripcion').toString()
];

exports.updateEmpaque = [
    check('IdEmpaque', 'IdEnvase debe ser Entero').isInt(),
    check('NombreEmpaque').isLength({ min: 3, max: 50 }),
    check('Descripcion').isLength({ max: 150 }).optional({ nullable: true }),
    sanitize('NombreEmpaque').toString(),
    sanitize('Descripcion').toString()
];

exports.createTrabajador = [
        check('IdSucursal', 'IdSucursal debe ser entero!').isInt(),
        check('IdCargo', 'IdCargo debe ser entero').isInt(),
        check('Nombres', 'Nombres debe tener un minimo de 4 y un maximo de 50').isLength({ min: 4, max: 50 }),
        check('Apellidos', 'Apellidos debe tener un minimo de 4 y un maximo de 50').isLength({ min: 4, max: 50 }),
        check('IdTipoDocumento', 'IdDocumento es requerido y debe ser entero').isInt(),
        check('Documento', 'Documento es necesario').isLength({ min: 4, max: 50 }),
        check('Imagen', 'Imagen es requerida').exists(),
        check('FechaNacimiento', 'FechaNacimiento debe ser una fecha').exists(),
        check('Direccion', 'Direccion debe tener un minimo de 10 y un maximo de 300').isLength({ min: 10, max: 300 }),
        check('Telefono1', 'EL primer telefono es requerido y debe tener 8 digitos!').isLength(8).isInt(),
        check('Telefono2', 'El Telefono2 debe tener una longitud de 8 digitos y ser numerico!').isInt().isLength(8),
        check('FechaIngreso', 'FechaIngreso es requerida!').exists(),
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
    check('IdSucursal', 'IdSucursal debe ser entero').isInt(),
    check('IdOperadora', 'IdOperadora debe ser entero').isInt(),
    check('NumeroTelefono', 'NumeroTelefono es requerido').exists(),
    sanitize('IdSucursal').toInt(),
    sanitize('IdOperadora').toInt()
];

export {createCargo,}