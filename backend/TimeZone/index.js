/*En este fichero tenemos la conexion al servidor*/

'use strict'                    // Para activar el modo estricto y nuevas funcionalidades de JavaScript

const app = require('./app');   // Importamos el módulo app.js que tiene la configuración del servidor
var port = 4000;                // Creamos el puerto a usar por la aplicación


//Crear servidor y a escuchar peticiones HTTP
app.listen(port, () => { 
    console.log('Servidor corriendo en http://localhost:' + port);
}); 