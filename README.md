# Keepcoding Proyecto Nodejs Jose Luis Bustos
Keepcoding Proyecto Nodejs Jose Luis Bustos


<h3>Pasos para Arranque proyecto</h3>

1. Arrancar mongoDB. Si la base de datos MongoDb no está en localhost, entonces habrá que entrar al fichero ./libs/mongooseConnect.js y cambiar la URL del servidor MongoGB
2. Ejecutar dentro de la carpeta ./proyecto el comando "npm run dev".
3. Si se quiere instalar los datos por defecto, se ejecutará el GET: "http://localhost:3000/apiv1/install", sitodo va bien la respuesta sera success:true

<h3>Ejecutar funcionalidad del API</h3>


<b>Login al sistema</b>. Enviar un POST a la url: http://localhost:3000/apiv1/login, pasandole por Body o Query los parametros "user, password , languaje", siendo languaje el idioma con los valores:

    - es => Español (por defecto)
    - en => Ingles

Una vez logado el sistema emitirá un "token" json que habrá que usar en el resto de peticiones por query o body: 

Usuario de ejemplo:
    user: joselbe1976@hotmail.com
    password: 123456


Ejemplo respuesta de login:

        {
            "success": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkIUzI1NiIsInR5cCI6IkIUzI1NiIsInR5cCI6IkpXVCJY",
            "message": "Login OK"
        }

<b>Crear un nuevo usuario. </b>. Se dan de alta usuarios nuevos, verificando que el mail no exista en la base de datos. Hay que usar un POST con la URL : http://localhost:3000/apiv1/usuarios, pasándole por Body o Query los parametros: nombre, mail, password, token, languaje.

Ejemplo de respuesta al crear nuevo usuario:

        {
        "success": false,
        "message": "El usuario ya existe en el sistema. No se da de alta"
        }      


<b>Lista de TAGS</b>. Se muestra la lista de tags existente en la base de datos.  Ejemplo de URL GET:

http://localhost:3000/apiv1/anuncios/tags?languaje=en&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiam9zZWxiZTE5NzZAaG90bWFpbC5jb20iLCJpYXQiOjE0OTQ4MzQxNDYsImV4cCI6MTQ5NDgzNTA0Nn0.kkFMleZ458a0w0-M1oyI4RlLMWiAEpgi9iQHI476bfY

Y ejemplo de respuesta JSON:

        {
        "success": true,
        "data": [
            "lifestyle",
            "mobile",
            "motor"
        ]
        }

