var express = require('express');
var router = express.Router();

const sesiones = require("../controllers/sesiones");
const aplicaciones = require("../controllers/aplicaciones");
const usuarios = require("../controllers/usuarios");
const tiendas = require('../controllers/tiendas');
const favoritas = require("../controllers/favoritas");
const buscaUsuario = require("../middlewares/buscaUsuario");
const verificaAdmin= require("../middlewares/verificaAdmin");
const config = require('../config/config.js');           //fichero config.js contiene clave para generar jwt en jwtSecret
//const cabeceraCORS = require('../middlewares/cabeceraCORS');

const expressjwt = require('express-jwt');
//const verificajwt = require('../middlewares/verificaJWT');

/* Ruta a / (home page) */
router.get('/', function(req, res, next) {
    console.log("Entrando en home. con session.userId:", req.session.userId, req.session.jwt );
    let usuario=''; let token='';
    if ( req.session.usuario ) { usuario=req.session.usuario.email;  token=req.session.jwt; }
    res.render('index', {title:'Express', usuario:usuario, token:token, objeto:{ titulo: 'Express', usuario:usuario, quiensoyyo: res.locals.quiensoyyo} });
  });


/* Rutas a recursos http de sesiones */
router.route('/sesiones/nueva')
  .get(sesiones.formulariologin)

  .post(sesiones.autenticar, sesiones.generarToken, sesiones.enviarToken);
router.route('/sesiones/logout')
  .get(sesiones.logout);


/* Rutas a recursos http del modelo APLICACIONES */
router.route('/aplicacion')
.get  ( aplicaciones.home )   

router.route('/aplicacion/nueva')
.get  ( buscaUsuario, verificaAdmin, aplicaciones.formulario )
.post ( aplicaciones.ponjwtenRequest,expressjwt( { secret: config.jwtSecret, algorithms: ['HS256']  }), aplicaciones.crear ); // requiere un jwt de un userid 


/* Rutas a recursos http de USUARIOS */
router.route('/usuarios').get( /*expressjwt( { secret: config.jwtSecret, algorithms: ['HS256']  }), */ usuarios.listadoPaginado );
router.route('/usuarios/nuevo')
  .get(buscaUsuario, verificaAdmin, usuarios.formulario)
  .post(usuarios.crear, sesiones.generarToken, sesiones.enviarToken);

router.route('/usuarios/update')
  .get(usuarios.formularioUpdate)
  .post(usuarios.actualizar);

router.route('/usuarios/mistiendas')
  .get(sesiones.verificarLogin, usuarios.misTiendas)


/* Rutas a recursos de la entidad Favoritas (tiendasfavoritas) */
router.route('/usuarios/favoritas')
  .get(favoritas.formulario);
router.route('/favoritas/create')
  .post(favoritas.crearFavorita);

/* Rutas a recursos http de TIENDAS */
router.route('/tiendasall').get( tiendas.listado );
router.route('/tiendas').get( tiendas.listadoPaginado );
router.route('/tiendasall').get( tiendas.listadoPaginado ).post( tiendas.ejemplo );
router.route('/tiendas/nueva').get( sesiones.verificarLogin, tiendas.formulario).post(tiendas.crear); //para usuario con login
router.route('/tienda/nueva')
    .post( (req,res,next)=>{ console.log("route.post(tienda/nueva)...");next(); }, expressjwt( { secret: config.jwtSecret, algorithms: ['HS256']  }), tiendas.crear); //REST vliente remoto que envia jwt


router.route('/tiendas/:slug')
.get(tiendas.buscar, tiendas.verificarPropietario, tiendas.mostrar)
.delete(tiendas.buscar, tiendas.verificarPropietario, tiendas.borrar)
.put(tiendas.buscar, tiendas.verificarPropietario,  tiendas.modificar);
router.route('/ficheros')
.put(tiendas.cargadorMiddleware(), tiendas.verFicheros);


module.exports = router;