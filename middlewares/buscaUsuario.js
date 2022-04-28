//funcion anonima que busca el usuario que hace la peticion y guarda el objeto usuario en request.usuario
//Lo busca a partir de request.user  ..> id de usuario dejado por la libreria express-jwt al validar un jwt (Peticiones REST con jwt)
//o bien a partir de requeset.session.userId ..>id de usuario dejado por el proceso de login (Peticiones desde propia App con Login)
const Usuario = require("../models/usuario")


module.exports = function(request, response, next) {
    console.log("buscaUsuario()...");
    if (request.user) {
        Usuario.findById(request.user.id)
        .then (usuario=>{
            request.usuario = usuario;
            console.log("next() con usuario null");
            next();
        })
    } else {
        if ( request.session && request.session.usuario ) {
            request.usuario = request.session.usuario;
            console.log("next() con usuario de session");
            next();
        } 
        else {
            console.log("next() con error y response.send() con Usuario no autorizado");
            next(new Error("Usuario no logado y no hay usuario en la request") );
        }

    }
    
}