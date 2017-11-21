const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

function validsParamas(req,res,next){
    let errors = validationResult(req);
    (!errors.isEmpty()) ? res.status(402).json(errors.array()) : next();
}
const userSignUpValidation=[
        check('IdRol','IdRol es requerido y debe ser un entero').isInt(),
        check('IdTrabajador','IdTrabajador es requerido y debe ser un entero').isInt(),
        check('Username','username es requerido!').exists(),
        check('Username','username debe tener un minimo de 5 caracteres').isLength({min:5,max:50}),
        check('Email','El campo email es requerido!').exists(),
        check('Email','Campo email debe ser un Email').isEmail(),
        check('Password','password es requerido!').exists(),
        check('Password','El password debe tener una longitud minima de 8 y maxima de 20').isLength({min:4,max:20}),
        sanitize('IdRol').toInt(),
        sanitize('IdTrabajador').toInt()
],userFindUsername=[
    check('Username','username es requerido!').exists(),
    check('Username','username debe tener un minimo de 5 caracteres').isLength({min:5,max:50})
], userFindEmail=[
    check('Email','El campo email es requerido!').exists(),
    check('Email','Campo email debe ser un Email').isEmail()
], userSignInValidation=[
    check('Username','8username es requerido!').exists(),
    check('Username','username debe tener un minimo de 5 caracteres').isLength({min:5,max:50}),
    check('Password','password es requerido!').exists(),
    check('Password','El password debe tener una longitud minima de 8 y maxima de 20').isLength({min:4,max:20}),
    check('gettoken','gettoken debe ser un boleano').isBoolean().optional({nullable:true}),
    sanitize('gettoken').toBoolean()
], userUpdate=[
    check('IdUsuario','IdUsuario debe ser un Entero!').isInt().optional({nullable:false}),
    check('Username','username debe tener un minimo de 5 caracteres').isLength({min:5,max:50}),
    check('Password','password es requerido!').exists(),
    check('Password','El password debe tener una longitud minima de 8 y maxima de 20').isLength({min:4,max:20}),
    check('IdRol').optional({nullable:true})
];

const categoriaCreate=[
    check('Nombre','Nombre es requerido').exists(),
    check('Descripcion').exists()
],updateCategoria=[
    check('IdCategoria').isInt(),
    check('Nombre','Nombre es requerido').exists(),
    check('Descripcion').exists()
],changeStateCategoria=[
    check('IdCategoria').isInt(),
    check('Habilitado','Habilitado debe ser un booleano.').isBoolean()
];  

const createCargo=[
    check('NombreCargo').exists(),
    check('DescripcionCargo').exists()
],updateCargo=[
    check('IdCargo').exists().isInt(),
],changeStateCargo=[
    check('Habilitado').isBoolean()
]

const createProveedor=[
    check('NombreProveedor').exists(),
    check('Direccion'),
    check('Email'),
    check('Descripcion'),
    check('NombreRepresentante').exists()
],updateProveedor=[
    check('IdProveedor').isInt(),
    check('NombreProveedor').exists(),
    check('Direccion'),
    check('Email'),
    check('Descripcion'),
    check('NombreRepresentante').exists()
],changeStateProveedor=[
    check('IdProveedor').exists(),
    check('Habilitado').isBoolean()
];

const createEntradaBodegaAP=[
    check('IdBodegaAreaP').exists(),
    check('IdTrabajador').isInt(),
	check('IdProveedor').isInt(),
	check('IdEstadoEdicion').isInt(),
	check('NFactura').exists(),
	check('RepresentanteProveedor').exists(),
	check('PorcRetencion').isInt(),
	check('PorcIva').isInt(),
	check('PorcDescuento').isInt(),
	check('FechaHora').exists()
],editEntradaBodegaAP=[
    check('IdEntradaBodegaAP').isInt()
],crearFactura=[
    check('IdEntradaBodegaAP').isInt()
];

const createTrabajador=[
    check('IdSucursal','IdSucursal debe ser entero!').isInt(),
    check('IdCargo','IdCargo debe ser entero').isInt(),
    check('Nombres','Nombres debe tener un minimo de 4 y un maximo de 50').isLength({min:4,max:50}),
    check('Apellidos','Apellidos debe tener un minimo de 4 y un maximo de 50').isLength({min:4, max:50}),
    check('NumeroCedula','NumeroCedula es requerido').exists(),
    check('FechaNacimiento','FechaNacimiento debe ser una fecha').exists(),
    check('Direccion','Direccion debe tener un minimo de 10 y un maximo de 300').isLength({min:10,max:300}),
    check('FechaIngreso','FechaIngreso es requerida!').exists(),
    sanitize('IdSucursal').toInt(),
    sanitize('IdCargo').toInt()
],updateTrabajador=[
    check('IdTrabajador','IdTrabajador debe ser un entero!').exists().isInt(),
    sanitize('IdTrabajador').toInt()
],deleteTrabajador=[
    check('Habilitado','Habilitado es requerido y debe ser un boolean').isBoolean(),
    sanitize('Habilitado').toBoolean()
];

const createSucursalTelef=[
    check('IdSucursal','IdSucursal debe ser entero').isInt(),
    check('IdOperadora','IdOperadora debe ser entero').isInt(),
    check('NumeroTelefono','NumeroTelefono es requerido').exists(),
    sanitize('IdSucursal').toInt(),
    sanitize('IdOperadora').toInt()
];

module.exports={
    userSignUpValidation,
    userSignInValidation,
    userFindEmail,
    userFindUsername,
    validsParamas,
    userUpdate,
    changeStateCargo,
    changeStateCategoria,
    changeStateProveedor,
    createCargo,
    createProveedor,
    categoriaCreate, 
    updateCargo,
    updateCategoria,
    updateProveedor,
    createTrabajador,
    updateTrabajador,
    deleteTrabajador,
    createSucursalTelef
}   