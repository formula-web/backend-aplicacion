document.querySelector("#botonenviar").addEventListener('click',(evento)=>{
    evento.preventDefault();
    enviarFormAjax(document.querySelector("form"), 'http://localhost:3000/tienda/nueva');
})

function enviarFormAjax(form, destino) {
    console.log("enviando form por ajax...");

    var mensaje=document.querySelector("#mensaje");
    var authorization = "Bearer " + document.querySelector("#jwt").value;
    //let formData = new FormData(form);
    //formData.append("titulo", document.querySelector("#titulo").value);
    //formData.append("descripcion", document.querySelector("#descripcion").value);
    //formData.append("aceptacreditcar", document.querySelector("#aceptacreditcar").value); //campo select
    //console.log("FORM A ENVIAR:");
    //formData.forEach(dato=>{console.log(dato)});
    // 'Content-Type':'multipart/form-data'
    let formData="titulo="+document.querySelector("#titulo").value;
    formData+="&descripcion="+document.querySelector("#descripcion").value;
    formData+="&aceptaCreditCard="+document.querySelector("#aceptacreditcar").value;
    
    fetch(destino,{method:'POST', 
    headers:{'Authorization':authorization ,'Content-Type': 'application/x-www-form-urlencoded' } ,
    body: formData  
    })
    .then( res=> {
            console.log("Sale del Fetch por el then", res.status, res);
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
                console.log( "Recibido Error", error);
                mensaje.innerHTML="Error. Status="+res.status ;

            } )
        })
        .catch( error=> {mensaje.innerHTML="Error envio AJAX." + JSON.stringify(error) } );
}