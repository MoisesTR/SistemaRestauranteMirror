const { query,param,body,check, validationResult } = require('express-validator/check');
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

exports.userSignUpValidationAdmin = [
    body('Username', 'username debe tener un minimo de 5 caracteres y maximo 40.').isLength({ min: 5, max: 40 }),
    body('Email', 'Campo email debe ser un Email').isEmail().optional({ nullable: true }),
    body('Imagen', 'Imagen debe ser un archivo').optional({ nullable: true }),
    body('Password', 'El password debe tener una longitud minima de 5 y maxima de 20').isLength({ min: 5, max: 20 }),
    sanitize('username').toString(),
    sanitize('email').toString(), 
    sanitize('password').toString()
];
exports.getTelefonoSucursal = [
    param('IdTelefonoSucursal').isInt(),
    check('IdSucursal', 'IdSucursal es requerido.').isInt(),
    sanitize('IdSucursal').toInt()
]
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

var createCategoria = [
        body('NombreCategoria', 'El nombre de la categoria es requerido').exists(),
        body('DescripcionCategoria', 'La descripcion de la categoria es requerida!').exists()
    ];

exports.createCategoria = createCategoria;

exports.updateCategoria = createCategoria.concat([
        check('IdCategoria').isInt(),
        sanitize('IdCategoria').toInt(),
    ]);

var createCargo = [
    check('NombreCargo', 'El nombre del cargo es requerido!').exists(),
    check('DescripcionCargo', 'La descripcion del cargo es requerida!').exists(),
    sanitize('NombreCargo').toString()
];
exports.createCargo = createCargo;


exports.updateCargo = createCargo.concat([
    check('IdCargo').exists().isInt(),
]);

var createProveedor = [
    body('NombreProveedor').exists(),
    body('NombreProveedor', 'Ingrese el Nombre del proveedor.').exists(),
    body('Direccion', 'Ingrese la direccion del proveedor.').isAscii().trim(),
    body('Email','Ingrese el Email del Proveedor.').isEmail(),
    body('Descripcion').optional({nullable:true}),
    body('NombreRepresentante','Ingrese el Nombre del representante.').exists(),
    body('Documento','El campo de Ruc es requerido!.'),
    body('Retencion2','El campo de retencion es requerido.').exists(),
    body('Mercado','El campo de mercado es requerido.').exists()
    
];
exports.createProveedor = createProveedor;

exports.updateProveedor = createProveedor.concat([
    param('IdProveedor', 'Seleccione el proveedor a actualizar.').isInt()
]);

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
function isDate(nombreCampo ) {
    return check(nombreCampo,nombreCampo + '  es requerido.').exists()
    .custom((value) => {
        console.log('Valor sin formatear: ' +value);
        let date = new Date(value);
       
        if(isNaN(date)) {
            console.log('No es una fecha')
            throw new Error(`El parametro ${nombreCampo} debe ser una fecha valida.`);
        }
        date = date.toISOString();
        return date;
    },`El parametro ${nombreCampo} debe ser una fecha valida.`)
}

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

exports.Habilitado = [
    query('Habilitado','Habilitado debe ser booleano.').optional({nullable:true}).isBoolean(),
    sanitize('Habilitado').toBoolean()
]
exports.IdSucursal = [
    check('IdSucursal','Ingresa un Numero Valido').isInt().optional({nullable:true}),
    sanitize('IdSucursal').toInt()
]
exports.getMenues = [
    query('IdRol','Rol Necesario').isInt()
]
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
    body('Telefono2', 'El Telefono2 debe tener una longitud de 8 digitos y ser numerico!').optional({nullable:true}),
    body('FechaIngreso', 'FechaIngreso es requerida!').exists(),
    sanitize('IdSucursal', 'IdSucursal debe ser entero').toInt(),
    sanitize('IdCargo', 'IdCargo debe ser entero').toInt(),
    sanitize('FechaNacimiento').toDate(),
    sanitize('FechaIngreso').toDate()
];

exports.updateTrabajador = [
    check('IdTrabajador', 'IdTrabajador debe ser un entero!').exists().isInt(),
    sanitize('IdTrabajador').toInt()
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

var createSubclasificacion =  [
    body('NombreSubClasificacion','El nombre de la subclasificacion es requerido, y no debe tener mas de 50 caracteres.').isAscii().isLength({max:50}),
    body('DescripcionSubClasificacion', 'La Descripcion no debe tener mas de 150 caracteres.').isAscii().optional({nullable:true}),
    body('IdClasificacion', 'Id de la clasificacion es requerido!').isInt(),
    sanitize('IdClasificacion').toInt(),
    sanitize('NombreSubClasificacion').toString()
];

exports.createSubclasificacion = createSubclasificacion;

exports.updateSubclasificacion = createSubclasificacion.concat([
    param('IdSubClasificacion').toInt().exists(),
    sanitize('IdSubClasificacion').toInt()
]);

var createSucursal =  [
    body('NombreSucursal','El nombre de la subclasificacion es requerido, y no debe tener mas de 50 caracteres.').isAscii().isLength({max:50}),
    body('Direccion', 'La Direccion no debe tener mas de 300 caracteres.').isAscii(),
    body('Telefono1','El telefono es requerido y debe tener 8 digitos.').isLength(8).isInt(),
    body('Telefono2','El telefono debe tener 8 digitos.').optional({nullable:true}),
    sanitize('NombreSucursal').toString(),
    sanitize('Direccion').toString().trim()
];

exports.createSucursal = createSucursal;

exports.updateSucursal = createSucursal.concat([
    param('IdSucursal', 'Id de la sucursal es requerido!').isInt(),
    sanitize('IdSucursal').toInt()
])

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
    body('IdProveedor', 'Selecciona Un proveedor.').isInt(),
    body('IdSubClasificacion', 'Selecciona Una SubClasificacion.').isInt(),
    body('IdEstado','Elige el estado del producto.').isInt(),
    body('NombreProducto','Ingresa el Nombre del Producto.').isAscii(),
    body('Descripcion','Ingresa la Descripcion del producto.').isAscii(),
    body('Imagen','Ingresa el nombre de la Imagen.').optional({nullable:true}),
    body('IdEnvase').isInt().optional({nullable:true}),
    body('IdEmpaque', 'Debes seleccionar un empaque.').isInt().optional({nullable:true}),
    body('CantidadEmpaque').optional({nullable:true}),
    body('IdUnidadMedida','Debes seleccionar una unidad de medida.').isInt(),
    body('ValorUnidadMedida').exists(),
    body('DiasRotacion').isInt(),
    body('TipoInsumo').isInt(),
    body('CodigoProducto').isAscii(),
    body('CodigoInterno').optional({nullable:true}),
    body('CodigoBarra').optional({nullable:true}),
    sanitize('ValorUnidadMedida').toFloat(),
    sanitize('DiasRotacion').toInt(),
    sanitize('CodigoProducto').toString()
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

exports.changeStateGeneric = (nameIdParam) => {
    return [
        param(nameIdParam).isInt(),
        check('Habilitado','Habilitado debe ser booleano.').isBoolean(),
        sanitize('Habilitado').toBoolean(),
        sanitize(nameIdParam).toInt()
    ]
}
let createTipoDocumento = [
    body('NombreTD', 'Tipo de Documento necesario.').isAscii().isLength({min:2,max:50 }),
    body('DescripcionTD','Es Necesaria la Descripcion del Tipo de Documento').isAscii().isLength({min:2, max:50}),
    sanitize('NombreTD').toString(),
    sanitize('DescripcionTD').toString()
];

exports.createTipoDocumentoI = createTipoDocumento

exports.updateTipoDocumentoI = createTipoDocumento.concat([
    param('IdTipoDocumento').isInt(),
    sanitize('IdTipoDocumento').toInt()
])

exports.createFacturaCompra  = [
    body('NumRefFactura').exists(),
    body('IdProveedor').exists(),
    body('IdTrabajador').exists(),
    body('IdTipoMoneda').exists(),
    body('IdFormaPago').exists(),
    body('NombVendedor').exists(),
    isDate('FechaFactura'),
    isDate('FechaRecepcion'),
    body('SubTotal').exists(),
    body('TotalIva').exists(),
    body('CambioActual').exists(),
    body('TotalDescuento').exists(),
    body('TotalCordobas').exists(),
    body('Retencion').exists()
];

exports.updateFacturaCompra  = [
    check('NumRefFactura'),
    check('IdTrabajador'),
    check('NombVendedor'),
    check('SubTotal'),
    check('TotalIva'),
    check('CambioActual'),
    check('TotalDescuento'),
    check('TotalCordobas'),
    check('Retencion')
];

exports.createDetalleFacturaCompra = [
    body('IdFactura').isInt().exists(),
    body('IdProducto').exists(),
    body('PrecioUnitario').exists(),
    body('Cantidad').exists(),
    body('GravadoIva').exists(),
    body('SubTotal').exists(),
    body('Iva').exists(),
    body('Descuento').exists(),
    body('TotalDetalle').exists(),
    body('Bonificacion').isInt().optional({nullable:true})
];

exports.updateDetalleFacturaCompra = [
    body('IdFactura').isInt().exists(),
    body('IdProducto').exists(),
    body('PrecioUnitario'),
    body('Cantidad'),
    body('GravadoIva'),
    body('SubTotal'),
    body('Iva'),
    body('Descuento'),
    body('TotalDetalle'),
    body('Bonificacion')
];

exports.getFacturaById = [
    check('IdFactura').isInt()

];

exports.getCambiosFacturaById = [
    check('IdFactura').isInt()

];


exports.obtenerFacturasC = [
    check('FechaInicio').toDate().optional({nullable:true}),
    check('FechaFin').toDate().optional({nullable:true}),
    check('IdProveedor').isInt().optional({nullable:true}),
    check('IdEstadoFactura').isInt().optional({nullable:true}),
    sanitize('FechaInicio', 'La fecha Inicio enviada no es una fecha valida.').toDate(),
    sanitize('FechaFin', 'La Fecha Fin Enviada no es una fecha valida').toDate()
];

exports.getMenuesByRol = [
    check('IdRol').isInt()
];


var createTelefonoProveedor = [
    body('IdProveedor', 'Selecciona Un proveedor.').isInt(),
    body('Telefono', 'Ingresa un telefono.').isAscii(),
    body('Nombre','Ingresar un nombre.').isAscii(),
    body('Cargo').optional({nullable:true}),
    sanitize('IdProveedor').toInt(),
    sanitize('Telefono').toString(),
    sanitize('Nombre').toString()
];

exports.createTelefonoProveedor = createTelefonoProveedor;