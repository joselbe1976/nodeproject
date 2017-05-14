"use_strict";

//Es un midleware que asignamos a los rutes (midleware) para controlar la seguridad. Asi lo pasamos como una function

const jwt = require('jsonwebtoken'); //modulo JWT
const translate = require('../i18n/translate.js'); //modulo de traducciones

module.exports = (req, res, next)=>{


    //buscamos el Token en la llamada por body, url o cabecera
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    let languaje = req.body.languaje || req.query.languaje;
    if (languaje == null || languaje == undefined){languaje='es';} //si no viene el lenguaje, se pone por defecto Español

    //verificamos el Token que nos envian a ver si es correcto
    jwt.verify(token, 'secret', (err, decoded) =>{ 
        if (err){
             res.json({success:false , token: '', data: '',  message: translate.getMessage('ERROR_LOGIN',languaje)});
             return;
        }
        req.decoded = decoded;
        next();
    });

}

