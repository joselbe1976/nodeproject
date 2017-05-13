/*
    Scripts de Arranque inicial del backend. Generamos los anuncios
*/


"use_strict";

const fs = require('fs');
const path = require('path');

//Inicializa la instancia en mongo DB
function installDB(callBack){
    readFileJson((err,anuncios)=>{
        if (err){
            console.log('Error al instalar: ', err);
            return;
        }

        callBack(null,anuncios);

    });
}


//Lectura del fichero local Json y llama al callback cuando lo lea
function readFileJson(CallBack){

 
    //Creamos el nombre del fichero completo esta en la misma ruta Path
    const fichero = path.join('./','libs','anuncios.json');
 

    // Leemos contenido en Json del fichero del paquete
    fs.readFile(fichero,'utf-8',(err,data)=>{

        if (err){
            CallBack(err);
            return;
        }

        //Parseamos el contenido convirtiendo en objeto 
        try{
            const dtaJson = JSON.parse(data);
          
            //Devolvemos la version
            CallBack(null,dtaJson);
            
        }catch(err){
            CallBack(err);
            return;
        }
       
    });

}

module.exports = {
    installDB : installDB
};