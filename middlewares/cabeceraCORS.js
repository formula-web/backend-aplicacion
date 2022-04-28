//Funcion Middleware para insertar en el flujo de envio de respuestas http para insertar la cabecera CORs en la response
//La cabecera CORS habilita que el navegador lea la respuesta del servidor a las peticiones AJAX
const expressUnless = require("express-unless");
module.exports = function ( opciones ) {
        let corsfunction=function(req, res, next) {
          //Cabecera que indica origen (dominios) de las peticiones ajax admitidos
          res.header("Access-Control-Allow-Origin", '*');
          //Restringir tipos de cabeceras en la peticion (opcional):
          res.header("Access-Control-Allow-Headers","Origin, X-Requested.With, Content-type, Accept, Authorization, Application");
          next();
        }
        corsfunction.unless = expressUnless;
        return corsfunction;
};

