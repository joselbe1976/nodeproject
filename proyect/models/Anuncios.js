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

//creamos los indices
anunciosSchema.index({ precio: 1, type: -1 }); //indice
anunciosSchema.index({ nombre: 1, type: -1 }); //indice
anunciosSchema.index({ venta: 1, type: -1 }); //indice
anunciosSchema.index({ tags: 1, type: -1 }); //indice

//Lista de anuncios
anunciosSchema.statics.list = function(filter,start, limit, sort,callback){
    //asignamos filtro
    const query = Anuncios.find(filter);

    //opciones de la consulta para paginacion y ordenacion
    query.limit(limit);
    query.skip(start);
    query.sort(sort);

    //ejecutamos y llamamos el callback 
    query.exec(callback);
    
};

/* Lista de Tags */
anunciosSchema.statics.listTags = function(callback){
    Anuncios.distinct('tags',callback); //distinct tags
};



//Creamos el modelo

var Anuncios = mongoose.model('Anuncios',anunciosSchema);

module.exports = Anuncios;
