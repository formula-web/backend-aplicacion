// CONTROLLERS DEL MODEL/ENTIDAD/COLECCION: USUARIOS
// fuciones que generan la response a los request hacia los recursos http de la entidad 
// Se exportan las funciones en un objeto anónimo, importado y usado desde el archivo de rutas (en /routes), el archivo de rutas asocia las rutas http con los métodos definidos en aqui

//const { request } = require("express");
const Usuario = require("../models/usuario");


function buscar ( request, response, next) {
    //console.log("buscando", request.params.id);
    Usuario.find ( {slug:request.params.slug } )
    .then((usuario)=>{
        //console.log("usuario encontrada:", usuario);
        request.usuario = usuario; //guarda usuario encontrada en el objeto request de la peticion
        next();
    })
    .catch((error)=>{
        //console.log("Usuario No encontrado:", error);
        next( err);

    })
}

function crear (request, response) {
    Usuario.create( 
    { 
        email:request.body.email, 
        nombre: request.body.nombre,
        password: request.body.password
    }
    )
    .then( function( Usuario ) {
        console.log("...Usuario creado OK.");  
        response.send(Usuario);

    }  
    )
   .catch( error=>{
       console.log("Error creando Usuario:",error);
       response.status(422).send(error.message);
    }) 
}

function formulario(request, response) {
    response.render('usuario-form');
}

function listadoPaginado (request, response) {
    Usuario.paginate( { },{ page:request.query.pagina || 1, limit:4, sort:{'_id':-1} } )
    .then ( docs=>{
        //console.log("Docs:", docs);
        response.send( docs);
    })
    .catch ( error=>{
        console.log("Error listado",error);
        response.send("Error en listado");
    } );
}


module.exports = { buscar, crear, formulario, listadoPaginado };