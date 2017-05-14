"use strict";

const mongoose = require('mongoose');

//Esquema de usuario
const usuariosSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});


//Creamos un método stático 
usuariosSchema.statics.findUserbyMail = function(email, callback){
    const query = Usuarios.find({email: email});
    
    //ejecutamos y llamamos el callback 
    query.exec(callback);
    
};


//Creamos el modelo

var Usuarios = mongoose.model('Usuarios',usuariosSchema);

module.exports = Usuarios;
