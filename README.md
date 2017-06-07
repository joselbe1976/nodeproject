<hr>
# Keepcoding Modulo Devops Junio 2017
<hr>
<br>

Instrucciones para probar el despliegue Devops del proyecto que realizamos en el modulo del master (NodeJS).<br>

La URL de la Web desplegada con SSL es:
<br>
https://www.jlbedevelop.es


Para probar el backend desplegado esta es la URL:
<br>
https://backend.jlbedevelop.es

Para probar un estatico se puede lanzar la URL:
<br>
https://backend.jlbedevelop.es/images/bici.jpg

<br>

Nota: las URL de abajo que se vayan a usar deben usar la url con https pues estan securizadas con SSL.


<hr>
# Keepcoding Módulo NodeJS Mayo 2017
<hr>
<br>

<h3>Arrancar la base de datos de MongoDB</h3>
Si la base de datos MongoDb no está en localhost, entonces habrá que entrar al fichero ./libs/mongooseConnect.js y cambiar la URL del servidor MongoGB


<h3>Instalación inicial de la Base de datos</h3>
Hay que seguir los siguientes pasos:

    1. Desde consola , entrar a la carpeta ./proyecto con el comando "cd proyecto"

    2. Una vez dentro ejecutar el comando "npm run install"

    3. Una vez ejecutado, apareceran los mensajes siguientes

        conectado a MongoDB
        Eliminados los anuncios...
        Eliminados los usuarios...
        Generados 4  anuncios correctamente
        Generados 2  usuarios correctamente
        Fin del proceso de generación


<h3>Arranque Servidor del proyecto</h3>

1. Ejecutar dentro de la carpeta ./proyecto mediante comando en terminal "cd proyecto" y  ejecutar el comando "npm run dev".


<h3>Ejecutar funcionalidad del API</h3>


<b>Login al sistema</b>. Enviar un POST a la url: http://localhost:3000/apiv1/login, pasandole por Body o Query los parámetros "user, password , languaje", siendo languaje el idioma con los valores:

    - es => Español (por defecto)
    - en => Ingles

Una vez logado el sistema emitirá un "token" json que habrá que usar en el resto de peticiones por query o body desde la web o dispositivo que consuma este API.

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


<b>Lista de Anuncios</b>. Esta funcionalidad nos permite hacer una solicitud GET con una url como esta:

        http://localhost:3000/apiv1/anuncios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiam9zZWxiZTE5NzZAaG90bWFpbC5jb20iLCJpYXQiOjE0OTQ4MzQ3ODUsImV4cCI6MTQ5NDgzNTY4NX0.u6foJGDI6rAQj-HErzYExSN_2HenirkIBEuRh7mN-Bo

Se le pueden pasar los siguientes filtros por Body o Query :

    - venta. Se le puede pasar con true/false para poder filtrar anuncios de venta o de compra
    - nombre. Para filtrar por el nombre del articulo
    - tag. Para filtrar por un tag concreto
    - precio. Permite filtros por precio de la siguiente manera
            - Filtro por precio concreto: ?precio=50
            - Filtro por precio mayor igual que: ?precio=50-
            - Filtro por precio menor igual que: ?precio=-50
            - Filtro por rango de precios: ?precio=50-300

    Ejemplo de URLS :

        http://localhost:3000/apiv1/anuncios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiam9zZWxiZTE5NzZAaG90bWFpbC5jb20iLCJpYXQiOjE0OTQ4MzQ3ODUsImV4cCI6MTQ5NDgzNTY4NX0.u6foJGDI6rAQj-HErzYExSN_2HenirkIBEuRh7mN-Bo&precio=10-50


            {
            "success": true,
            "data": [
                {
                "_id": "59195de32052fb19de9b0e4a",
                "nombre": "iPhone 4",
                "venta": true,
                "precio": 10,
                "foto": "/images/iphone.png",
                "__v": 0,
                "tags": [
                    "lifestyle",
                    "mobile"
                ]
                },
                {
                "_id": "59195de32052fb19de9b0e49",
                "nombre": "iPhone 3GS",
                "venta": false,
                "precio": 50,
                "foto": "/images/iphone.png",
                "__v": 0,
                "tags": [
                    "lifestyle",
                    "mobile"
                ]
                }
            ]
            }

Se le pueden pasar los siguientes parámetros por Body o Query para controlar el listado, paginación y su ordenación:

    - start. Indicar desde que posición quiere empezar. Ejemplo: ?start=0
    - limit. Para indicar el número de anuncios que queremos leer. Ejemplo: ?limit=10
    - sort . Para ordenar por un camp. ejemplo ?sort=nombre

    Ejemplo de URL:

        http://localhost:3000/apiv1/anuncios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiam9zZWxiZTE5NzZAaG90bWFpbC5jb20iLCJpYXQiOjE0OTQ4MzQ3ODUsImV4cCI6MTQ5NDgzNTY4NX0.u6foJGDI6rAQj-HErzYExSN_2HenirkIBEuRh7mN-Bo&sort=nombre&start=0&limit=3
        

<b>Acceso a fotos</b>. El API devuelve en los anuncios, como se accede a la ruta de la imagen. Un ejemplo de URL que tendrá que construir la Web o Dispositivo es:

        http://localhost:3000/images/iphone4.jpg

