document.querySelector("#botonenviar").addEventListener('click',(evento)=>{
    evento.preventDefault();
    enviarFormAjax(document.querySelector("form"), 'http://localhost:3000/aplicacion');
})

function enviarFormAjax(form, destino) {
    console.log("enviando form por ajax...");

    var mensaje=document.querySelector("#mensaje");
    
    fetch(destino,{method:'GET', headers:{'Content-Type': 'application/x-www-form-urlencoded'} } )
        .then( res=> {
            console.log("Sale del Fetch por el then", res.status);
            res.json()
            .then( data=>{
                // data: array de objetos "aplicacion" (retornado por mongoose: response.send(docs))
                console.log( "Datos Recibidos="+JSON.stringify(data) );
                mensaje.innerHTML="Datos Recibidos. Status="+res.status;
                for (var i=0; i< data.length; i++) {
                    mensaje.innerHTML+="<br>" + "Datos en bruto:"+data[i].nombre;
                }
                
            } )
            .catch(error=>{
                console.log( "Recibido Error");
                mensaje.innerHTML="Error. Status="+res.status ;

            } )
        })
        .catch( error=> {mensaje.innerHTML="Error envio AJAX." + JSON.stringify(error) } );
}