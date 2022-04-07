var express = require('express');
var router = express.Router();

const sesiones = require("../controllers/sesiones");


/* Rutas a recursos http de sesiones */
router.route('/sesiones/nueva')
  .get(sesiones.formulariologin)

  .post(sesiones.autenticar, sesiones.generarToken, sesiones.enviarToken);
router.route('/sesiones/logout')
  .get(sesiones.logout);


module.exports = router;