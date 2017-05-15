"use_strict";

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncios');
const security = require('../../libs/security');

/*lista de Tags existentes */
router.get('/tags',security,(req,res,next)=>{
     Anuncio.listTags((err,data)=>{
            if (err){
                next(err);
                return;
            }
            res.json({success: true, data: data});
     });  

});



/* Lista de anuncios */
router.get('/', security, function(req, res, next) {

  //pillamos los argumentos de filtro y contruimos el filtro 
  const filter = {}; //filters
  //filtro Venta
  const venta = req.query.venta || req.body.venta;
  if (venta){filter.venta=venta;}
  
  //filtro nombre
  const nombre = req.query.nombre || req.body.nombre;
  if (nombre) {
      filter.nombre = new RegExp('^' + req.query.nombre, "i"); //ignoramos mayus / minusculas
  }

  //filtro por tag
  const tag = req.query.tag || req.body.tag;
  if(tag){
      filter.tags = tag;
  }

  //filtro por precio
  const precio = req.query.precio || req.body.precio;
  if (precio){
      
      if (precio.includes('-')){
          //menor que
          if (precio.substr(0, 1)==='-'){
            filter.precio = {'$lte':Math.abs(parseInt(precio))}; //pasamos un número NO negativo
          }
          else if(precio.substr(precio.length-1, 1)==='-'){ //si ultimo caracter es - es mayor que
            //mayor que
            const precioAux = precio.substr(0,precio.length-1); //cortamos el -
            filter.precio = {'$gte':parseInt(precioAux)}; 
          } 
          else if(precio.indexOf("-") > 0 && precio.indexOf("-") < precio.length){ 
          //rango precios
             const val1 = precio.substr(0,precio.indexOf("-"));
             const val2 = precio.substr(precio.indexOf("-")+1, precio.length);
             filter.precio = {'$gte':parseInt(val1), '$lte':parseInt(val2)}; //rango de precios 
          }
      }
      else{
          filter.precio = precio; //filtro por precio exacto
      }
  }

  //otros operadores de listados
    const start = parseInt(req.query.start || req.body.start); 
    const limit = parseInt(req.query.limit || req.body.limit);  
    const sort = req.query.sort || req.body.sort;


  Anuncio.list(filter,start, limit, sort,(err,data)=>{
      if (err){
          next(err);
          return;
      }
     res.json({success: true, data: data});
  });  

});

module.exports = router;
