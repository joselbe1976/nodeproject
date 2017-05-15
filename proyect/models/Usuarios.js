"use strict";

const mongoose = require('mongoose');

//Esquema de usuario
const usuariosSchema = mongoose.Schema({
    nombre: {type: String,required: true},
    email: {type: String, required: true, unique: true},
    clave: {type: String, required: true}
});

//definimos el indice por email
usuariosSchema.index({ email: 1, type: -1 }); //indice


//Creamos un método stático 
usuariosSchema.statics.findUserbyMail = function(email, callback){
    const query = Usuarios.find({email: email});
    
    //ejecutamos y llamamos el callback 
    query.exec(callback);
    
};


//Creamos el modelo

var Usuarios = mongoose.model('Usuarios',usuariosSchema);

module.exports = Usuarios;
