var express = require('express');
var router = express.Router();

var usuarios = require('../controllers/usuarios');


/* Rutas a recursos http de usuarios */
router.route('/usuarios').get( usuarios.listadoPaginado );
router.route('/usuarios/nuevo').get(usuarios.formulario).post(usuarios.crear);
//router.route('/usuarios/:slug')
//.get(usuarios.buscar, usuarios.mostrar)
//.delete(usuarios.borrar, usuarios.buscar)
//.put(usuarios.buscar, usuarios.modificar);

//router.get('/usuarios', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

module.exports = router;
