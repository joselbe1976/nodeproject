"use_strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;

//Indicamos a mongoose que tipo de promesas vamos a usar
mongoose.Promise = global.Promise;  //promesas nativas v8

//escuchamos la conexion en caso de error
conn.on('error',(err)=>{
    console.log('error de conexion',err);
    process.exit(1); //sino conecta tiro toda la aplicacion
});

//escuchamos si esta conexion es OK
conn.once('open',()=>{
    console.log('conectado a MongoDB');
});

//realiza la conexion

mongoose.connect('mongodb://localhost/proyectjlb');



//no me hace falta exportar la conexion con el modulo, lo hace mongoose internamente