/* Fichero que almacena la(s) ruta(s) del API */

'use strict'

var express = require('express');                               // Cargamos modulo express
var TimeController = require('../controllers/time');            // Cargamos el controlador que tiene el/los metodo(s)

var router = express.Router();                                  // Instanciamos la propiedad router que tiene el modulo express


// Rutas de prueba
router.get('/test', TimeController.test);

// Rutas utiles
router.post('/time', TimeController.timeZone);


module.exports = router;