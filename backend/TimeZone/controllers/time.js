/* Fichero que contiene el controlador con los metodos */

'use strict'

var validator = require('validator');                   // Importamos el modulo validator, para validar los datos de los parametros que nos estan llegando

var controller = {

    // Metodo de prueba de nuestro controlador
    test: (req, res) => {
        return res.status(200).send({
            status: 'Success',
            message: 'Soy la accion test del controlador Time'
        });
    },

    timeZone: (req, res) => {

        var params = req.body;                                          // Tomamos los parametros enviados

        try {                                                           // Validamos que los datos sean validos
            var validate_hour = !validator.isEmpty(params.dato1);       
            var validate_utc = !validator.isEmpty(params.dato2);
        } catch {
            return res.status(200).send({
                status: 'ERROR',
                message: '¡Faltan datos por enviar!'
            });
        }

        if (validate_hour && validate_utc) {                             // En caso de no estar vacíos los datos, se ejecuta el cuerpo del If

            var hour_split = params.dato1.split('\:');                   // Dividimos la hora para validar si está en el formato correcto(hora=0-23, minutos=0-59, segundos=0-59)
            var utc = params.dato2;

            if (hour_split[0] < 0 || hour_split[0] > 23 || hour_split[1] < 0 || hour_split[1] > 59 || hour_split[2] < 0 || hour_split[2] > 59 || params.dato1 == 0) {               // En caso de no ser valida, enviamos el mensaje de error
                return res.status(200).send({
                    status: 'ERROR',
                    message: '¡La hora no es valida!'
                });
            }

            if (hour_split[0] == 0 || hour_split[0] == 1 || hour_split[0] == 2 || hour_split[0] == 3 || hour_split[0] == 4 || hour_split[0] == 5 || hour_split[0] == 6 || hour_split[0] == 7 || hour_split[0] == 8 || hour_split[0] == 9) {         

                hour_split[0] = '0' + hour_split[0];                       // En caso de que la hora sea un dato simple(0-9), le agregamos un '0' antes ya que la funcion que utilizaremos para calcular así lo requiere
                //console.log(hour_split);
            }

            if (utc <= -13 || utc >= 13) {                                 // Validamos que el dato de utc este dentro del rango existente de timezone
                return res.status(200).send({
                    status: 'ERROR',
                    message: '¡EL formato UTC no existe, intente valores entre: -12 y 12!'
                });
            }

            if (utc == -9 || utc == -8 || utc == -7 || utc == -6 || utc == -5 || utc == -4 || utc == -3 || utc == -2 || utc == -1 || utc == '-0') {
                var utc_split = utc.split('\-');                                
                utc_split[1] = '-0' + utc_split[1];                         // En caso de que utc sea un dato simple(-0|-9), le agregamos un '-0' antes ya que la funcion que utilizaremos para calcular así lo requiere
                utc = utc_split[1];
                //console.log(utc);
            }

            if (utc == '0' || utc == 1 || utc == 2 || utc == 3 || utc == 4 || utc == 5 || utc == 6 || utc == 7 || utc == 8 || utc == 9) {

                utc = '+0' + utc;                      // De no ser negativo, en caso de que utc sea un dato simple(0-9), le agregamos un '+0' antes ya que la funcion que utilizaremos para calcular así lo requiere                     
                //console.log(utc);
            }

            if (utc == 10 || utc == 11 || utc == 12 ) {

                utc = '+' + utc;                     // O en caso de que utc sea compuesto(10-9), le agregamos solo '+' antes ya que la funcion que utilizaremos para calcular así lo requiere
                //console.log(utc);
            }

            //var miFecha1 = new Date('2020-12-24T18:31:45+1200');
            //console.log(miFecha1);

            var date = new Date('2020-12-25T' + hour_split[0] + ':' + hour_split[1] + ':' + hour_split[2] + utc + '00');                 // Agregamos los datos validados de modo de obtener este formato: 2020-12-24T18:31:45+1200
            console.log(date);

            var hour = date.getUTCHours();
            var minutes = date.getUTCMinutes();                 // Obetenemos los datos de la funcion Date()
            var seconds = date.getUTCSeconds();

            return res.status(200).send({
                time: hour + ':' + minutes + ':' + seconds,    // Mostramos la hora de acuerdo al formato solicitado
                timezone: 'utc'
            });

        } else {

            return res.status(200).send({                       // Else que se ejecuta en caso de que los datos traidos(validate_hour && validate_utc) no sean validos
                status: 'ERROR',
                message: '¡Los datos no son validos!'
            });

        }

    }

}

module.exports = controller;