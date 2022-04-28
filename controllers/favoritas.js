const Tienda = require("../models/tienda");
const Usuario = require("../models/usuario");
const tiendasFavoritas =require("../models/tiendasfavoritas");


function formulario (request, response) {
    console.log( "favoritas.formulario()...");
    // Si no hay usuario logado, pantalla de error
    if ( !request.session.usuario) {
        response.send("<h1>No hay ningun usuario logado</h1>");
        return;
    }

    // Busca usuario logado
    Usuario.findOne( {'_id': request.session.usuario._id } )
    .then ( usuario=>{
        // Busca tiendas del usuario logado, y tiendas-favoritas del usuario logado  y las envia el formulario "favoritas-form"
        usuario.usuarioTiendas
        .then( tiendas=>{
            usuario.usuarioFavoritas
            .then ( favoritas =>{
                response.render('favoritas-form', { tiendas:tiendas, favoritas:favoritas, usuario:usuario });
            })
        })    
    })
}


async function crearFavorita( request, response ) {
    var usuario = request.body.usuario;
    var tienda  = request.body.tienda;
    var creada=null; var usuarioenc=null; var tiendaenc=null;
    // si no existe usuario o no existe tienda, no hacer nada 
    console.log("crearFavorita()...", usuario, tienda);
    await Usuario.findOne({'_id': usuario }).then( usuario=>{usuarioenc=usuario} ).catch(error=>{ usuarioenc=error});
    await Tienda.findOne({'_id': tienda}).then(tienda=>{tiendaenc=tienda} ).catch(error=>{ tiendaenc=error});
    if ( !usuarioenc ) { console.log("Usuario no existe(n)");  }
    if ( !tiendaenc)   { console.log("Tienda no existe(n)");  }
    if ( !usuarioenc || !tiendaenc) { return null; }
    console.log("buscado usuario y tienda, encontrado:", usuarioenc.email, tiendaenc.titulo );

    // ver si ya existe un doc que relaciona usuario-tienda en 
    // si existe, no hacer nada, si no existe: crearla
    return tiendasFavoritas.findOne( { '_usuario': usuario, '_tienda':tienda })
    .then ( favorita=>{
        if ( favorita ) { 
            console.log("...favorita ya existia.");
            response.redirect("/usuarios/favoritas");
            return favorita;  }
        else {
            tiendasFavoritas.create( {'_usuario':usuario, '_tienda': tienda})
            .then ( favorita=>{ 
                console.log("...favorita creada:", favorita);
                response.redirect("/usuarios/favoritas");
                return favorita } );
        }
    } )
    .catch ( error=>{ console.log("Error en tiendasFAvoritas.findOne", error)});

}

module.exports = { formulario, crearFavorita };

