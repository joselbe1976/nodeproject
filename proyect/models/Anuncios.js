"use strict";

const mongoose = require('mongoose');

//Esquema de usuario
const anunciosSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


//Lista de anuncios, sin filtros ni nada
anunciosSchema.statics.list = function(callback){
    const query = Anuncios.find({});
    
    //ejecutamos y llamamos el callback 
    query.exec(callback);
    
};


//Creamos el modelo

var Anuncios = mongoose.model('Anuncios',anunciosSchema);

module.exports = Anuncios;
