// CONTROLLERS DEL MODEL/ENTIDAD/COLECCION: USUARIOS
// fuciones que generan la response a los request hacia los recursos http de la entidad 
// Se exportan las funciones en un objeto anónimo, importado y usado desde el archivo de rutas (en /routes), el archivo de rutas asocia las rutas http con los métodos definidos en aqui

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

function crear (request, response, next) {
    Usuario.create( 
    { 
        email:request.body.email, 
        nombre: request.body.nombre,
        password: request.body.password
    }
    )
    .then( function( usuario ) {
        console.log("...Usuario creado OK... ->next()");
        request.usuario = usuario;  
        next();
    }  
    )
   .catch( error=>{
       console.log("Error creando Usuario:",error);
       response.status(422).send(error.message);
       next();
    }) 
}

function actualizar (request, response ) {
    console.log('email recibido: ', request.body.email);
    console.log("actualizar... request:",request.body);
    Usuario.count( ).then( (cuenta)=>{
        if (!cuenta) { response.status(422).send("Usuario no existe"); return;}
    })

    Usuario.updateOne( { email:request.body.email }, 
    { 
        nombre: request.body.nombre,
        password: request.body.password,
        admin: request.body.admin,

    }
    )
    .then( function( usuario ) {
        console.log("...Usuario Actualizado ok");
        response.status(200).send( {mensaje:"Actualizado OK"});  
     }  
    )
   .catch( error=>{
       console.log("Error actualizando Usuario:",error);
       response.status(422).send( {mensaje:error.message} );
    }) 
}



function formulario(request, response) {
    response.render('usuario-form');
}
function formularioUpdate(request, response) {
    response.render('usuario-form2', {email:'yo@yo.com', nombre:'Paco', password:'1234'});
}


function listadoPaginado (request, response) {
    Usuario.paginate( { },{ page:request.query.pagina || 1, limit:20, sort:{'_id':-1} } )
    .then ( docs=>{
        //console.log("Docs:", docs);
        response.send( docs);
    })
    .catch ( error=>{
        console.log("Error listado",error);
        response.send("Error en listado");
    } );{}
}

// Retorna listado de tiendas del usuario actual ID de usuario el que esté en request.session (se guarda al hacer login)
// usa la entidad virtual "tiendas" creada en el scheme de usuarios
function misTiendas(request, response) {
    Usuario.findOne( {'_id': request.session.usuario._id } )
    .then( usuario=>{
        //.usuarioTiendas es un "virtual" (vista) definida en el model usuario y que retorna un promise de las tiendas de ese usuario
        usuario.usuarioTiendas.then( tiendas=>{
            response.json(tiendas);
        }).catch( error=>{ response.json(error)});
    }).catch(error=>{response.json(error)});
}


module.exports = { buscar, crear, formulario, listadoPaginado, formularioUpdate, actualizar, misTiendas };