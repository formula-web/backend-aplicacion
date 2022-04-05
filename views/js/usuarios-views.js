window.onload=()=>{
    console.log("Cargado usuarios-views.js");

    // Disable / Enable boton Actualizar
    let bactualizar=document.querySelector("input[type='submit']");
    bactualizar.disabled=true;
    document.querySelector("form").addEventListener('change',(ev)=>{
        var hayvacios=false;
        document.querySelectorAll("form > input").forEach(input=>{
            if (input.value=='') hayvacios=true;
        })
        if (!hayvacios)  bactualizar.disabled=false;
        else bactualizar.disabled=true;
    });
    document.querySelector("#botonxml").addEventListener('click', botonxml);
    document.querySelector("#botonfetch").addEventListener('click', botonfetch);
}

function botonxml(ev) {
    ev.preventDefault();
    console.log("clic en boton xmlhttprequest");
    var formData = new FormData( document.querySelector("form") );
    var req = new XMLHttpRequest();
    req.open('POST', '/usuarios/update');
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(formData);
    req.onreadystatechange=function(data){
        console.log("Sale del xmlhttprequest",data);
        var mensaje=document.querySelector("form > div");
        console.log( "Modificado OK. Res="+req.responseText );
        mensaje.innerHTML="Modificado OK. Status="+req.status+" Body="+req.responseText;        
    }
}

function botonfetch(ev) {
    ev.preventDefault();
    console.log("clic en boton fetch");

    let datos=document.querySelector("#email").value;
    data="email="+datos;
    datos=document.querySelector("#nombre").value;
    data+="&nombre="+datos;
    datos=document.querySelector("#password").value;
    data+="&password="+datos;
    datos=document.querySelector("#admin").value;
    data+="&admin="+datos;


    console.log("hace fetch... datos=",data);
    fetch('/usuarios/update',{method:'POST', headers:{'Content-Type': 'application/x-www-form-urlencoded'},body:data } )
        .then( res=> {
            console.log("Sale del Fetch por el then", res.status);
            res.json()
            .then( data=>{
                var mensaje=document.querySelector("form > div");
                console.log( "Modificado OK. Body="+JSON.stringify(data) );
                mensaje.innerHTML="Modificado OK. Status="+res.status+ "Mensaje:"+data.mensaje;
            } )
            .catch(error=>{
                var mensaje=document.querySelector("form > div");
                console.log( "Recibido Error");
                mensaje.innerHTML="Error. Status="+res.status ;

            } )
        })
        .catch( error=> {mensaje.innerHTML="Error al modificar." + JSON.stringify(error) } );
}



