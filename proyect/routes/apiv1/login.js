"use_strict";

var express = require('express');
var router = express.Router();

const Usuario = require('../../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const translate = require('../../i18n/translate.js'); //modulo de traducciones

// parametrizacion global expira el Token 
const minutesExpireToken = 15;




/* login al sistema */
router.post('/', (req, res, next) => {

    //Recupero el usuario y clave por  body o por Query URL
    const user = req.body.user || req.query.user; //es el mail
    const clave = req.body.password || req.query.password; //clave
    let languaje = req.body.languaje || req.query.languaje; // idioma del login
    if (languaje == null || languaje == undefined){languaje='es';} //si no viene el lenguaje, se pone por defecto Español

    // Buscar al usuario, si existe y la password es correcta ...
   
    Usuario.findUserbyMail(user, (err,data)=>{
        if (err){
          res.json({success:false , tokenID: '', message: err});
          return;
        }

       //su cumple usuario con encontrado 
       if (data[0] === undefined){
           res.json({success:false , token: '', message: translate.getMessage('ERROR_LOGIN',languaje)});
          return;
       }


        //Comparamos si la clave es correcta
        if (bcrypt.compareSync(clave, data[0].clave)){

            //creamos el Token
            var token = jwt.sign({
              data: user
            }, 'secret', { expiresIn: 60 * minutesExpireToken});

            //Respuesta JSON
            res.json({success:true , token: token, message: translate.getMessage('CONECT_OK',languaje)});


        }
        else
        {
            //no son iguales. No login
            res.json({success:false , token: '', message:translate.getMessage('ERROR_LOGIN',languaje)});
        }
    });

});

module.exports = router;
