'use strict'
const jwt = require('jsonwebtoken');
const moment = require('moment');
let secret="R3st@urAn3_C4aN";
const database= require('./database');
const sql = require('mssql');

function createToken(user){
    var _token='';
    const payload={
        sub:user.IdUsuario,
        username:user.Username,
            email:user.Email,
            role:user.IdRol,
            IdTrabajador:user.IdTrabajador,
            iar:moment().unix(), /* Fecha de creacion */
            exp:moment().add(5,"minutes").unix() /* Token expira en un dia */
        };
        //jsonwebtoken agrega el campo iat por defecto
        //Generated jwts will include an iat (issued at) claim by default unless noTimestamp is specified. 
        //If iat is inserted in the payload, it will be used instead of the real timestamp for calculating other things like exp given a timespan in options.expiresIn.
        //En este caso la fecha de expiracion la calculamos con moment
    console.log('Creando payload')
    return jwt.sign(payload,secret);
}
function ensureAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).json({status:403,code:'NAUTH',message:'La peticion no tiene cabecera de authenticacion!'});
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    var decoded =jwt.decode(token,{complete:true});
  
    jwt.verify(token, secret, function(err, decoded) {
        // err
        // decoded undefined
        console.log('Comprobando validez del token');
        if(err){
            delete err.message //Borramos el mensaje por defecto que nos envia "invalid signature"
            err.message="Token Invalido!";
            err.code='EITOKEN';
            return res.status(401).json(err);
        }
        //decoded contiene el payload
        //Verificar que el token no ha expirado
        if(decoded.exp <= moment().unix()){
           return res.status(401).json({status:401,code:'EXPTOKEN',message:"El token ha expirado"});
        }
        //A continuacion procedemos a buscar el usuario para validar que se encuentre habilitado
        //en caso de encontrarlo refrescaremos su informacion por si ha habido un cambio
        var aoj=[];
        database.pushAOJParam(aoj,'username',sql.NVarChar(20),decoded.username);
        database.storedProcExecute('SP_GetUsuariobyUsername',aoj).then((userResult) => {
            console.log('Busqueda de usuarios realizada');
            //Resultado del procedimiento
            let user = userResult.recordset[0];
            //Si encontramos el usuario
            if(user){
                console.log('Se encontro el usuario');
                if(user.habilitado == false){
                    //si el usuario se encuentra deshabilitado
                    return res.status(401).json({status:401,code:'EPUSER',message:'Usuario deshabilitado,favor contactar con soporte Casa Cross'});
                }   
                //Si el usuario esta habilitado se procede a actualizar el username y el email
                //por si ha habido un cambio en estos
                //Verificamos que no ah habido cambio en la informacion del usuario, desde la creacion del token
                console.log(moment(user.update_at).unix())
                if(moment(user.update_at).unix() > decoded.iat){
                    // si su info cambio no lo dejamos procedere
                    return res.status(401).json({status:401,code:'EUCHAN',message:'La informacion del usuario cambio por favor vuelve a iniciar sesion!'})
                }
                //setear el valor del payload en la request, para poder acceder a esta informacion
                //en todas la funciones de nuestros controladores
                req.user= decoded;
                next(); //next para pasar al siguiente controlador
            }else{
                return res.status(401).json({status:401,code:'EPUSER',message:'Usuario no encontrado,favor contactar con soporte Casa Cross'});
            }
        }).catch((err) => {
            console.log('Error con la base de datos:'+err);
          res.status(500).json(err);  
        })
      });
    
}
module.exports.createToken=createToken;
module.exports.ensureAuth=ensureAuth;