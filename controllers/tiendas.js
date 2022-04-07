// CONTROLLERS DE LA ENTIDAD TIENDAS
// fuciones que generan la response a los request hacia los recursos http de la entidad 
// Se exportan las funciones en un objeto anónimo, importado y usado desde el archivo de rutas (en /routes), el archivo de rutas asocia las rutas http con los métodos definidos en aqui

//const { request } = require("express");
const Tienda = require("../models/tienda");
const cargadorficheros = require('../config/cargadorficheros-multer.js');


//middlware buscar: se usa en las demás funciones para buscar un item. Integrado como middleware:
//primer argumento en router.get, .update, .delete de la ruta con slug:  "/tiendas/:slug" 
function buscar ( request, response, next) {
    //console.log("buscando", request.params.id);
    Tienda.find ( {slug:request.params.slug } )
    .then((tienda)=>{
        //console.log("tienda encontrada:", tienda);
        request.tienda = tienda; //guarda tienda encontrada en el objeto request de la peticion
        next();
    })
    .catch((error)=>{
        //console.log("No encontrada:", error);
        next( err);

    })
}

function modificar ( request, response, next) {
    console.log("Modificando ", request.params.id, "con ", request.body);
    Object.assign(request.tienda, request.body); //copia campos que existan
    request.tienda.save();
    response.send("Modificada");
}


function ejemplo (request, response) {
        console.log("Creando Tienda ejemplo...");
        Tienda.create( 
            {
                descripcion: 'Lorem Ipsum descripcion tienda ejemplo', 
                titulo:      'Tienda ejemplo',
                aceptaCreditCard: true,
                openHour:0,
                closeHour:23
           }
        )
           .then( function( tienda ) {
                console.log("...tienda ejemplo creada OK.");
                response.send("Tienda ejemplo creada OK");
                
            }  
           ).catch( error=>{
               console.log("Error creando tienda:",error);
               response.send("Error creando tienda:", error);
            } );
    }

    function formulario(request, response) {
        response.render('tienda-form');
    }

    function crear (request, response) {
        console.log("Tienda.crear()...");
        Tienda.create( 
        { 
            titulo:request.body.titulo, 
            descripcion: request.body.descripcion,
            aceptaCreditCard: request.body.aceptaCreditCard,
            _usuario: request.session.userId 
        }
        )
        .then( function( tienda ) {
            console.log("...tienda creada OK.");  
            response.send(tienda);

        }  
        )
       .catch( error=>{
           console.log("Error creando tienda:",error);
           response.send(error);
        }) 
    }

    function listado (request, response) {
        Tienda.find( )
        .then ( docs=>{
            console.log("Docs:", docs);
            response.send( docs);
        })
        .catch ( error=>{
            console.log("Error listado",error);
            response.send("Error en listado");
        } );
    }

    function listadoPaginado (request, response) {
        Tienda.paginate( { },{ page:request.query.pagina || 1, limit:4, sort:{'_id':-1} } )
        .then ( docs=>{
            console.log("Request.user:", request.user);
            response.send( docs);
        })
        .catch ( error=>{
            console.log("Error listado",error);
            response.send("Error en listado");
        } );
    }

    //busca por titulo
    function titulo( request, response) {
        console.log("buscando titulo=", request.params.titulo);
        Tienda.find ( {titulo:request.params.titulo})
        .then ( doc=>{
            response.send(doc);
        })
        .catch ( error=>{
            response.send(error);
        });
    }


    function borrar( request, response) {
        console.log("borrando titulo=", request.params.titulo);
        Tienda.findOneAndRemove ( {titulo:request.params.titulo})
        .then ( doc=>{
            response.send( "Borrado "+request.params.titulo);
        })
        .catch ( error=>{
            response.send(error);
        });
    }

    function mostrar( request, response) {
        console.log("mostrando request.tienda", request.tienda);
        response.json( request.tienda );
    } 
    function borrar( request, response) {
        console.log("borrando titulo=", request.params.titulo);
        Tienda.findOneAndRemove ( {titulo:request.params.titulo})
        .then ( doc=>{
            response.send( "Borrado "+request.params.titulo);
        })
        .catch ( error=>{
            response.send(error);
        });
    }

    // Cargador de ficheros con el objeto importado de la libreria multer
    function cargadorMiddleware( request, response, next ) {
        return cargadorficheros.fields(
            [ 
                {name:'fichero1', maxCount: 1}, //fichero1: nombre del parametro del body
                {name:'fichero2', maxCount: 1}
            ]
        );
        next();
    }

    function verFicheros(request, response) {
        response.send("Ficheros Subidos"); 
    }

    // Verifica que la tienda que se acaba de buscar (copiada en request.tienda), su usuario propietario coincide con el
    // que está lanzando la petición actual (copiado request.session.usuario)
    function verificarPropietario( request, response, next ) {
        console.log("verificarPropietario()...");
        console.log("Sesion:", request.session.usuario);
        console.log("request.tienda:", request.tienda);
        if ( !request.tienda ) next(); 
        if ( !request.session.usuario ) next (new Error("Ningun usuario en Login"));
        if ( (request.tienda._usuario == request.session.usuario._id) || request.session.usuario.admin ) return next();
        else next (new Error("Usuario no tiene permisos"));
    }



module.exports={ buscar, modificar, ejemplo, formulario, crear, listado, listadoPaginado, titulo,  mostrar, borrar, cargadorMiddleware, verFicheros, verificarPropietario };
//Equivale a:
//module.exports {ejemplo: ejemplo, formulario: formulario, ...}