// CONTROLLERS DE LA ENTIDAD APLICACION
// fuciones que generan la response a los request hacia los recursos http de la entidad 
// Se exportan las funciones en un objeto anónimo, importado y usado desde el archivo de rutas (en /routes), el archivo de rutas asocia las rutas http con los métodos definidos en aqui

//const { request } = require("express");
const aplicacion = require("../models/aplicacion");


function modificar ( request, response, next) {
    console.log("Modificando ", request.params.id, "con ", request.body);
    Object.assign(request.aplicacion, request.body); //copia campos que existan
    request.aplicacion.save();
    response.send("Aplicacion Modificada");
}


    function formulario(request, response) {
        response.render('aplicacion-form');
    }

    function crear (request, response) {
        console.log("aplicacion.crear()...,request.userId:",request.user.id);
        aplicacion.create( 
        { 
            nombre:request.body.nombre, 
            dominios: request.body.dominios,
        }
        )
        .then( function( aplicacion ) {
            console.log("...aplicacion creada OK.");  
            //response.header("Access-Control-Allow-Origin","*");  //para evitar bloqueo por CORS en respuesta hacia Ajax
            response.send(aplicacion);

        }  
        )
       .catch( error=>{
           console.log("Error creando aplicacion:",error);
           response.send(error);
        }) 
    }

    function home (request, response) {
        console.log("aplicaciones.home()...");
        aplicacion.find( ).sort( {'nombre':1})
        .then ( docs=>{
            //console.log("Docs:", docs);
            if (docs) {
                //response.header("Access-Control-Allow-Origin","*");  //para evitar bloqueo por CORS en respuesta hacia Ajax
                response.send( docs);
            }
            else
            response.send("NO HAY APLICACIONES");
        })
        .catch ( error=>{
            console.log("Error listado aplicaciones",error);
            response.send("Error en listado");
        } );
    }

    function listadoPaginado (request, response) {
        aplicacion.paginate( { },{ page:request.query.pagina || 1, limit:10, sort:{'_id':-1} } )
        .then ( aplicacions=>{
            console.log("Request.user:", request.user, "aplicacions al listado Paginado:", aplicacions);
            response.render( 'aplicacions-listado',{propietario:'Paco', aplicacions:aplicacions});
            //response.send( aplicacions );
        })
        .catch ( error=>{
            console.log("Error listado",error);
            response.send("Error en listado");
        } );
    }

    //busca por nombre
    function nombre( request, response) {
        console.log("buscando aplicacion=", request.params.nombre);
        aplicacion.find ( {nombre:request.params.nombre})
        .then ( doc=>{
            response.send(doc);
        })
        .catch ( error=>{
            response.send(error);
        });
    }


    function borrar( request, response) {
        console.log("borrando aplicacion=", request.params.nombre);
        aplicacion.findOneAndRemove ( {nombre:request.params.nombre})
        .then ( doc=>{
            response.send( "Borrada "+request.params.nombre);
        })
        .catch ( error=>{
            response.send(error);
        });
    }

    function mostrar( request, response) {
        console.log("mostrando request.aplicacion", request.aplicacion);
        response.json( request.aplicacion );
    } 

    function ponjwtenRequest( request, response, next) {
        console.log("Nombre Aplicacion del FORM:", request.body.nombre);
        console.log("JWT del form:",request.body.jwt );
        request.headers.authorization='Bearer ' + request.body.jwt;
        console.log("HEADERS: ", request.headers)
        next();
    }



module.exports={ modificar,  formulario, crear, home, listadoPaginado, mostrar, borrar, ponjwtenRequest };
//Equivale a:
//module.exports = {buscar: buscar, formulario: formulario, ...}