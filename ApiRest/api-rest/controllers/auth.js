'use strict'
var sql = require('mssql');
var jwt = require('../services/jwt');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const database = require('../services/database');
const saltRounds = 10;
const { matchedData, sanitize } = require('express-validator/filter');

function pushAOJParam(aoj, name, type, value) {
	aoj[aoj.length] = {
		pName: name,
		pType: type,
		pData: value
	}
}
//funcion registro\
function signUp(req,res){
    const userData = matchedData(req,{locations:['body']});
    var aoj=[];
    console.log('signup',userData)
    bcrypt.hash(userData.Password,saltRounds).then((hashPassw) => {
        userData.Password=hashPassw;
        console.log('password hasseada')
        pushAOJParam(aoj,'Username',sql.NVarChar(20),userData.Username);
        pushAOJParam(aoj,'Email',sql.NVarChar(100),userData.Email);
        console.log('entrando a stored proce')
        return database.storedProcExecute('USP_GET_USUARIO_BY_USERNAME_OR_EMAIL',aoj)
    }).then((usersfind) => {
        var users=usersfind.recordset;
        console.log(users)
        if(users.length  > 1){
            // console.log(usersfind.recordset[0])
            throw {status:401,code:"UEEXIST",message:"No se registro el email y username ya se encuentran registrados!"};
            //res.status(401).json({code:"UEXIST",message:"No se registro el usuario, email o username ya registrados!"})
        }else if(users.length ==1){
            // if(usersfind[0].username == userData.username || usersfind[1].username== userData.username)
            if(users[0].Username == userData.Username)
                throw {status:401,code:"UEXIST",message:'No se registro el usuario username:'+userData.username+', ya se encuentra registrado!'};
            else
                throw {status:401,code:"EEXIST",message:'No se registro el usuario email:'+userData.email+', ya se encuentra registrado!'};
        }else{
            console.log('Creando Usuario');
            pushAOJParam(aoj,'Password',sql.NVarChar(100),userData.Password);
            pushAOJParam(aoj,'IdRol',sql.Int,userData.IdRol);
            pushAOJParam(aoj,'IdTrabajador',sql.Int,userData.IdTrabajador)
            return database.storedProcExecute('USP_CREATE_USUARIO',aoj)
        }
    }).then((result) => {
        console.log("Creado")
        res.status(200).json({user:result.recordset[0]})
    }).catch((err) => {
        console.log('Error principal')
        res.status((err.status)? err.status :500).json(err)
    })
    
    //const token = req.headers.authorization.split(" ")[1]
   // const playload = jwt.decode(token)
}
//funcion login
function singIn(req,res){
    const userData= matchedData(req,{locations:'body'});
    var aoj=[];
    pushAOJParam(aoj,'Username',sql.NVarChar(20),userData.Username);
    database.storedProcExecute('USP_GET_USUARIO_BY_USERNAME',aoj).then((userResult) => {
        var user= userResult.recordset[0];
        const passh=user.Password;
        if(user){
            console.log('Usuario encontrado');

            bcrypt.compare(userData.Password,passh).then((isequal) => {
                if(isequal){  
                    console.log('Las contrasenas coinciden');    
                    console.log((userData.gettoken==true) ? 'Se retornara un token' : 'Se retornara la informacion del usuario');
                    if(userData.gettoken ==true){
                        console.log('Mande get token')
                        let tokenGen=jwt.createToken(user);
                        //console.log('Devolviendo token, del usuario '+user.username);
                        console.log('token:'+tokenGen);
                        res.status(200).json({token:tokenGen});
                    }else{
                        //delete user.password
                        res.status(200).json(user);
                    }
                }else{
                    console.log('Las contrasenas no coinciden');
                    res.status(202).json({status:202,code:'EPASSW',message:'El password es incorrecto'})
                }
            }).catch((errCompare) => {
                console.log('Error en la comparacion de los password!');
                console.log('Error:'+errCompare);
                res.status(500).json({status:500,code:'ERCOMP',message:'Error internor, si persiste comunicar con soporte'})
            })
        }else{
            console.log('Usuario no encontrado!');
            res.status(404).json({status:'401',code:'NEXIST',message:'El username ingresado no existe en la base de dato!'});
        }
    }).catch((err) => {
        console.log('Error principal: '+err);
        res.status(500).json(err)
    })
}
function getUsers(req,res){
    let Habilitado = req.query.Habilitado;
    var aoj=[];
    pushAOJParam(aoj,'Habilitado',sql.Int,Habilitado);
    database.storedProcExecute('USP_GET_USUARIOS',aoj).then((result) => {
        res.status(200).json({usuarios:result.recordset})
    }).catch((error) => {
        res.status(500).json(error)
    })
}
//
function updateUser(req,res){
    var userData = matchedData(req,{locations:'body'});
    var update = req.body;

    if(IdUsuario != req.user.sub){
        return res.status(403).json({status:403,code:'EUNAUTH',message:'Este no es tu usuario'});
    }
        var aoj=[];
    pushAOJParam(aoj,'IdUsuario',)
    pushAOJParam(aoj,'Email')
    pushAOJParam(aoj,'Email',)
    res.status(200).json({status:200,code:'',message:'Usuario actualizado'});
}
function changeStateUser(req,res){
    let IdUsuario= req.params.IdUsuario
    let Habilitado = req.body.Habilitado
    console.log('IdUsuario:'+IdUsuario,'Habilitado:'+Habilitado)
    var aoj=[];
    database.pushAOJParam(aoj,'IdUsuario',sql.Int,IdUsuario)
    database.pushAOJParam(aoj,'Habilitado',sql.Int,Habilitado)
    database.storedProcExecute('USP_DISP_USUARIO',aoj).then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0]
        let accion = (Habilitado == 0) ? 'Deshabilitado' : 'Habilitado';
        res.status(200).json((afectadas > 0) ? {success:'Usuario '+accion+' con exito!'} :{failed:'No se encontro el usuario solicitado!'})
        console.log('Usuario cambiado de estado con exito!')
    }).catch((err) => {
       res.status(500).json(err) 
       console.log('Error:',err)
    });
}
module.exports={
    signUp,
    singIn,
    updateUser,
    getUsers,
    changeStateUser
};