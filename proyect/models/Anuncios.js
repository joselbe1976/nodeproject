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


//Creamos el modelo

var Anuncios = mongoose.model('Anuncios',anunciosSchema);

module.exports = Anuncios;
