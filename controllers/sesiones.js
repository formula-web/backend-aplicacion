//Controller de Sesiones 
//Sesiones con tokens JWT 
const jwt = require('jsonwebtoken');
const secreto = require("../config/config").jwtSecret;
const bcrypt = require('mongoose-bcrypt');
const Usuario = require('../models/usuario');

//autenticar (LOGIN) Validar Usuario y Password formato middleware tras formulario login: se espera email y password en request.body
function autenticar( request, response, next) {
    Usuario.findOne({email: request.body.email})
    .then( usuario=> {
        if ( ! usuario ) return next( new Error("Usuario no existe."));
        usuario.verifyPassword(request.body.password) //plugin bcrypt chequea password form vs hash en mongodb
          .then( valida=>{
              if (valida) {  // Password OK. Rellenar datos del objeto global request.session mantenido por express-session
                  request.session.userId = usuario._id;
                  request.session.usuario = usuario;
                  request.session.jwt='';
                  request.usuario = usuario;   //   esto solo vale para la request de la peticion en curso, para generar el jwt
                  console.log("Password OK"); 
                  next();  
              }   
              else {  console.log("Password KO"); next(new Error('Credenciales no válidas'));}   // Password Error 
          })
    })
    .catch ( error=>next(error));
}

//verificar si hay un usuario logado. Antes de acceder a recursos protegidos
function verificarLogin(req, res, next) {
    if (!req.session) { res.status(401).send("Usuario no logado"); return; }
    if (!req.session.userId )  { res.status(401).send("Usuario no logado"); return; }
    next();
}



//Funciones middleware para manejar los tokens JWT
// Genera el token JWT y lo añade a la request. Si la request ya contiene un objeto usuario.
function generarToken( request, response, next) {
    if ( ! request.usuario ) return next();
    
    request.token = jwt.sign( {id: request.usuario._id},  secreto );
    next();
}

// Enviar el token JWT en la response. Si el usuario viene en la request.
function enviarToken( request, response, next ) {
    if ( request.usuario ) {
        console.log("enviarToken():", request.token);
        request.session.jwt += request.token;
        response.json({user:request.usuario, jwt:request.token})
    } else {
       console.log("Error al enviarToken(), no existe request.usuario");
       response.status(422).send('No hay usuario en la request. No se puede crear token JWT');
    }
}

function formulariologin(request, response) {
    response.render('login-form');
}

function logout(request, response) {
    request.session.destroy();
    response.redirect('http://localhost:3000');
}

module.exports = { autenticar, generarToken, enviarToken, formulariologin, verificarLogin, logout};