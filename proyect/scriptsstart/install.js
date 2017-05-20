var express = require('express');


require('../libs/mongooseConnect');
const Anuncio = require('../models/Anuncios');
const Usuario = require('../models/Usuarios');
const Install = require('./install_db');

const bcrypt = require('bcrypt')

//Instalacion

    //Lectura asincrona del fichero de instalacion en Json
   Install.installDB((err, data)=>{

        //Eliminamos
        Anuncio.remove().exec();
        console.log('Eliminados los anuncios...');
        Usuario.remove().exec();
        console.log('Eliminados los usuarios...');

        //Creamos  anuncios

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

                console.log('Generados', items.length, ' anuncios correctamente');
    
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

                console.log('Generados', items.length, ' usuarios correctamente');
    
    
            }

            
        }
        //mensaje fin instalacion
        console.log('Fin del proceso de generación');
    });




