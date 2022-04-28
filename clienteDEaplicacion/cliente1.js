document.querySelector("#botonenviar").addEventListener('click',(evento)=>{
    evento.preventDefault();
    var jwt=document.querySelector("#jwt").innerHTML;
    var authorization = 'Bearer ' + jwt;
    enviarFormAjax(document.querySelector("form"), 'http://localhost:3000/aplicacion/nueva');
})

function enviarFormAjax(form, destino) {
    console.log("enviando form por ajax...");

    let datos=document.querySelector("input#nombre").value;
    data="nombre="+datos;
    let jwt = document.querySelector("input#jwt").value;
    data+="&jwt=" + jwt;
    var mensaje=document.querySelector("#mensaje");
    
    fetch(destino,{method:'POST', headers:{'Content-Type': 'application/x-www-form-urlencoded'},body:data } )
        .then( res=> {
            console.log("Sale del Fetch por el then", res.status);
            res.json()
            .then( data=>{
                console.log( "App creada OK. Body="+JSON.stringify(data) );
                mensaje.innerHTML="App creada OK. Status="+res.status+ "Mensaje:"+data.mensaje;
            } )
            .catch(error=>{
                console.log( "Recibido Error");
                mensaje.innerHTML="Error. Status="+res.status ;

            } )
        })
        .catch( error=> {mensaje.innerHTML="Error envio AJAX." + JSON.stringify(error) } );
}