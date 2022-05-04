let parametros = {
    par1: 1,
    par2: 'A',
    nombre: 'Paco'
}
var atributos = Object.keys(parametros);  //Array con nombres atributos

var url = new URL('https://jsonplaceholder.typicode.com/posts');
Object.keys(parametros).forEach(atributo=>{
    url.searchParams.append(atributo, parametros[atributo]);
})
fetch(url).then(r=>r.json()).then(datos=>console.log(datos));


//LLAMADA POST
fetch( 'https://jsonplaceholder.typicode.com/posts', {
  method:'POST',
  body: JSON.stringify(parametros),
  headers: {'Content-type':'application/json; charset=UTF-8'}
}).then(r=>r.json()).then(datos=>console.log("DATOS:",datos));

