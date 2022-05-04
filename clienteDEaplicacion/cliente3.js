document.querySelector("#botonenviar").addEventListener('click',(evento)=>{
    evento.preventDefault();
    enviarFormAjax(document.querySelector("form"), 'http://localhost:3000/tienda/nueva');
})

function enviarFormAjax(form, destino) {
    console.log("enviando form por ajax...");

    var mensaje=document.querySelector("#mensaje");
    var authorization = "Bearer " + document.querySelector("#jwt").value;
    
    //let formData = new FormData();
    // 'Content-Type':'multipart/form-data'
    
    let formData="titulo="+document.querySelector("#titulo").value;
    formData+="&descripcion="+document.querySelector("#descripcion").value;
    formData+="&aceptaCreditCard="+document.querySelector("#aceptacreditcar").value;
    // 'Content-Type': 'application/x-www-form-urlencoded'

    fetch(destino,{method:'POST', 
    headers:{'Authorization':authorization, 'Content-Type': 'application/x-www-form-urlencoded'   } ,
    body: formData  
    })
    .then( res=> {
            console.log("Sale del Fetch por el then", res.status, res);
            if (res.status == 200) {
                res.json()
                .then( data=>{
                    // data: array de objetos "aplicacion" (retornado por mongoose: response.send(docs))
                    console.log( "Datos Recibidos="+JSON.stringify(data) );
                    mensaje.innerHTML="Datos Recibidos. Status="+res.status;
                   
                } )
                .catch(error=>{
                    console.log( "Error en el json de la tienda creada", error);
                    mensaje.innerHTML="Error. Status="+res.status ;
    
                } )
                   
            } else {
                mensaje.innerHTML="Error. Status="+res.status;
            }
    })
   .catch( error=> {mensaje.innerHTML="Error envio AJAX." + JSON.stringify(error) } );
}