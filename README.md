# Keepcoding Proyecto Nodejs Jose Luis Bustos
Keepcoding Proyecto Nodejs Jose Luis Bustos


Pasos para Arranque proyecto:

1. Arrancar mongoDB. Si la base de datos MongoDb no está en localhost, entonces habrá que entrar al fichero ./libs/mongooseConnect.js y cambiar la URL del servidor MongoGB
2. Ejecutar dentro de la carpeta ./proyecto el comando "npm run dev".
3. Si se quiere instalar los datos por defecto, se ejecutará el GET: "http://localhost:3000/apiv1/install", sitodo va bien la respuesta sera success:true

4. Login al sistema. Enviar un POST a la url: http://localhost:3000/apiv1/login, pasandole por Body o Query los parametros "user, password , languaje", siendo languaje el idioma con los valores:
    - es => Español (por defecto)
    - en => Ingles

Una vez logado el sistema emitirá un "token" json que habrá que usar en el resto de peticiones por query o body: 

Ejemplo respuesta:
        {
            "success": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkIUzI1NiIsInR5cCI6IkIUzI1NiIsInR5cCI6IkpXVCJY",
            "message": "Login OK"
        }

5. Crear un nuevo usuario. Se dan de alta usuarios nuevos, verificando que el mail no exista en la base de datos. Hay que usar un POST con la URL : http://localhost:3000/apiv1/usuarios, pasándole por Body o Query los paraetros: nombre, mail, password, token, languaje.

Ejemplo de respuesta:

{
  "success": false,
  "message": "El usuario ya existe en el sistema. No se da de alta"
}      



