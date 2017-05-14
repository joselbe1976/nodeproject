"use_strict";
const fs = require('fs');
const path = require('path');

//Modulo de traduccion de mensajes de error
var messagesES = null;
var messagesEN = null;
// leemos el fichero y lo cargamos en memoria


readFilejsonMessages((err,mensajes)=>{
        if (err){
            console.log('Error al Leer archivo de Traducciones ', err);
            return;
        }

        const data = JSON.parse(mensajes);
        
        for(var idx in data) {
            var items = data[idx];
            
            //instalacion de anuncios
            if (idx === 'es'){
                    messagesES = items;
            }
            else
            {
                    messagesEN = items;
            }
            
         
        }
    });


//devuelve un mensaje de un ID y en el idioma indicado
function getMessage(id, languaje){
    var valorReturn='';
    var msgFind = messagesES;

    if (languaje === 'en'){
            msgFind = messagesEN;
    }

    //Buscamos el id
    for (var i = 0; i < msgFind.length; i++){
        if (msgFind[i].id === id){
            valorReturn = msgFind[i].nombre;
        }
    }

    return valorReturn;
}





//funciones auxiliares

function readFilejsonMessages(CallBack){

 
    //Creamos el nombre del fichero completo esta en la misma ruta Path
    const fichero = path.join('./','i18n','messages.json');
 

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
            CallBack(null,data);
            
        }catch(err){
            CallBack(err);
            return;
        }
       
    });

}

//exportamos las funciones a usar
module.exports = {
    getMessage : getMessage
};


