const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

function validsParamas(req,res,next){
    let errors = validationResult(req);
    (!errors.isEmpty()) ? res.status(402).json(errors.array()) : next();
}
const userSignUpValidation=[
        check('username','username es requerido!').exists(),
        check('username','username debe tener un minimo de 5 caracteres').isLength({min:5,max:50}),
        check('role','El rol es requerido').exists(),
        check('email','El campo email es requerido!').exists(),
        check('email','Campo email debe ser un Email').isEmail(),
        check('password','password es requerido!').exists(),
        check('password','El password debe tener una longitud minima de 8 y maxima de 20').isLength({min:8,max:20})
],userFindUsername=[
    check('username','username es requerido!').exists(),
    check('username','username debe tener un minimo de 5 caracteres').isLength({min:5,max:50})
], userFindEmail=[
    check('email','El campo email es requerido!').exists(),
    check('email','Campo email debe ser un Email').isEmail()
], userSignInValidation=[
    check('username','8username es requerido!').exists(),
    check('username','username debe tener un minimo de 5 caracteres').isLength({min:5,max:50}),
    check('password','password es requerido!').exists(),
    check('password','El password debe tener una longitud minima de 8 y maxima de 20').isLength({min:8,max:20}),
    check('gettoken','gettoken debe ser un boleano').isBoolean().optional({nullable:true}),
    sanitize('gettoken').toBoolean()
], userUpdate=[
    check('id','id debe ser un Entero!').isInt().optional({nullable:false}),
    check('username').isLength({min:5,max:20}).optional({nullable:true}),
    check('password').isLength({min:8,max:25}).optional({nullable:true}),
    check('role').optional({nullable:true})
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
    check('NombreCargo').exist(),
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
    check('IdTrabajado'),
	check('IdProveedor'),
	check('IdEstadoEdicion'),
	check('NFactura'),
	check('RepresentanteProveedor'),
	check('SubTotalFactura'),
	check('PorcRetencion'),
	check('Retencion'),
	check('PorcIva'),
	check('IvaTotal'),
	check('PorcDescuento'),
	check('DescuentoTotal'),
	check('TotalFactura'),
	check('FechaHora')
],editEntradaBodegaAP=[
    check('IdEntrada')
]
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
    updateProveedor
}   