// CONTROLLERS DE LA ENTIDAD TIENDAS
// fuciones que generan la response a los request hacia los recursos http de la entidad 
// Se exportan las funciones en un objeto anónimo, importado y usado desde el archivo de rutas (en /routes), el archivo de rutas asocia las rutas http con los métodos definidos en aqui

const { request } = require("express");
const Tienda = require("../models/tienda");
const cargadorficheros = require('../config/cargadorficheros-multer.js');


//middlware buscar: se usa en las demás funciones para buscar un item. Integrado como middleware:
//segundo argumento en router.get, .update, .delete de la ruta con id:  "/tiendas/:id" 
function buscar ( request, response, next) {
    //console.log("buscando", request.params.id);
    Tienda.findById (request.params.id)
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
        //si peticion de cliente remoto, coger usuario del token jwt guardado en request.user.id
        //si peticion local, coger usuario del cliente logado en session.userId
        console.log("TIENDAS.crear()...");
        console.log("request.session.userId:", request.session.userId);
        console.log("request.user.id:", request.user.id);
        let usuario;
        if ( (request.user) && (request.user.id) ) 
                usuario=request.user.id; //coge el usuario del token jwt de la request
            else    
                usuario=request.session.userId; //coge el usuario logado
        Tienda.create( 
        { 
            titulo:request.body.titulo, 
            descripcion: request.body.descripcion,
            aceptaCreditCard: request.body.aceptaCreditCard,
            _usuario:usuario

        }
        )
        .then( function( tienda ) {
            console.log("...tienda creada OK.");  
            response.header("Access-Control-Allow-Origin","*"); 
            response.send(tienda);

        }  
        )
       .catch( error=>{
           console.log("Error creando tienda:",error);
           response.status(422);
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
            //console.log("Docs:", docs);
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

    function buscarid( request, response) {
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


    function mostrar( request, response) {
        console.log("mostrando request.tienda", request.tienda);
        response.json( request.tienda );
    } 

    function verificarPropietario(request, response, next) {
        next();
    }

module.exports={ buscar, modificar, ejemplo, formulario, crear, listado, listadoPaginado, titulo, buscarid, borrar, cargadorMiddleware, verFicheros, mostrar, verificarPropietario };
//Equivale a:
//module.exports {ejemplo: ejemplo, formulario: formulario, ...}