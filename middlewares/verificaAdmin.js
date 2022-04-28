
//funcion anonima que funciona en modo middleware
//verifica si el usuario en request.usuario es administrador (atributo admin). Si no lo es, sale con error. Si admin continua.
module.exports = function(request, response, next) {
    console.log("verificaAdmin()...");
    if ((request.usuario && request.usuario.admin) || (request.session.usuario && request.session.usuario.admin) )  {
        console.log("usuario si es admin->next()");
        return next();
    } else {
        console.log("usuario no es admin. return new Error");
        return next(new Error("Error. El usuario no es administrador"));
    }

}