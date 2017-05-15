"use_strict";

const express = require('express');
const router = express.Router();
const Usuario = require('../../models/Usuarios'); //modelo de usuarios
const bcrypt = require('bcrypt'); //encriptacion password

const security = require('../../libs/security'); //cargamos la seguridad por Token
const translate = require('../../i18n/translate.js'); //modulo de traducciones



/* Creación de un usuario con seguridad por Token*/
router.post('/', security, function(req, res, next) {

    //me envian por Query o Body, el mail, nombre y clave. Lo guardamos la clave en Hash

    const nombre = req.body.nombre || req.query.nombre;
    const mail = req.body.mail || req.query.mail;
    const password = req.body.password || req.query.password;
    let languaje = req.body.languaje || req.query.languaje; // idioma del login
    if (languaje == null || languaje == undefined){languaje='es';} //si no viene el lenguaje, se pone por defecto Español   

    
    //verifico si Existe el usuario, lo hacemos por mail.
    const num = Usuario.findUserbyMail(mail,(err,data)=>{

            //si no hay ese mail, lo doy de alta en usuarios
            
            if (data.length === 0){
                //Damos de alta
                    const user =  new Usuario();
                    user.nombre = nombre;
                    user.email = mail;
                    user.clave = password;

                    //Encriptamos la clave que venga del fichero a HASH
                    user.clave = bcrypt.hashSync(user.clave, 10);
                    
                    //grabo el anuncio
                    user.save((err,usuariosSave)=>{
                        if (err){
                            next(err);
                            return;
                        }

                        //respondemos
                        res.json({success:true , message: translate.getMessage('USER_SAVE_OK',languaje)});
                    });
            }
            else
            {
                res.json({success:false , message: translate.getMessage('USER_EXIST',languaje)});
                return;
            }

    })



});

module.exports = router;
