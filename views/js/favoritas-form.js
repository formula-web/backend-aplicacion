function activarChecks( tiendas, favoritas ){
     console.log("activarChecks()...",favoritas);
     var checks = document.querySelectorAll("input[type='checkbox']");
    if (checks) checks.forEach(check=>{
        let tienda = check.getAttribute('id');
        let existe = favoritas.find( elemento=>{if (elemento._tienda == tienda) return true; });
        if ( existe ) check.checked=true;
    });

}

    


