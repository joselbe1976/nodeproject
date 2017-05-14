var express = require('express');

var router = express.Router();
const Anuncio = require('../../models/Anuncios');
const Usuario = require('../../models/Usuarios');
const Install = require('../../libs/install_db');

const bcrypt = require('bcrypt')

//Instalacion
router.get('/', function(req, res, next) {
    //Lectura asincrona del fichero de instalacion en Json
   Install.installDB((err, data)=>{

        //Eliminamos
        Anuncio.remove().exec();
        Usuario.remove().exec();


        //Creamos usuarios y anuncios

        for(var idx in data) {
            var items = data[idx];
            
            //instalacion de anuncios
            if (idx == 'anuncios'){
                for (var i = 0; i < items.length; i++){
                    const anuncio =  new Anuncio(items[i]);
                    
                    //grabo el anuncio
                    anuncio.save((err,anunciosSave)=>{
                        if (err){
                            next(err);
                            return;
                        }
                    });
                }
    
            }

            //instalacion de usuarios
            if (idx == 'usuarios'){
                for (var i = 0; i < items.length; i++){
                    const user =  new Usuario(items[i]);

                    //Encriptamos la clave que venga del fichero a HASH
                    user.clave = bcrypt.hashSync(user.clave, 10);
                    
                    //grabo el anuncio
                    user.save((err,usuariosSave)=>{
                        if (err){
                            next(err);
                            return;
                        }
                    });
                }
    
            }

            
        }
        
        res.json({success:true , resultado: 'Generados los datos OK'});

    });

});

module.exports = router;
