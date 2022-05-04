// Variables globales
const formularioUI = document.querySelector('#formulario');
const listaProductoUI = document.getElementById('listaProducto');
let arrayProductos =[];

//Funciones
const CrearItem =(producto) => {
    if(producto == ""){
        alert("Por favor digite un producto")
    }else{
    let item ={
        producto: producto,
        estado: comprar
    }
    arrayProductos.push(item);
    return item;
} }

const GuardarBD =()=>{
localStorage.setItem('lista', JSON.stringify(arrayProductos))
PintarDB();
}

const PintarDB =()=>{
listaProductoUI.innerHTML = '';
arrayProductos = JSON.parse(localStorage.getItem('lista'));

if(arrayProductos === null){
arrayProductos = [];
} else{

    arrayProductos.forEach(element => {
      
         if(element.estado){
            listaProductoUI.innerHTML += `<div class="alert alert-success"
            role="alert">
            <i class="material-icons float-left mr-2">store</i><b>${element.producto}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`

         }else{
            listaProductoUI.innerHTML += `<div class="alert alert-danger"
            role="alert">
<i class="material-icons float-left mr-2">store</i><b>${element.producto}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
         }
        
         });
    

}
}

const EliminarBD =(producto)=>{
    
    let indexArray;

    arrayProductos.forEach((elemento, index)=>{
        if(elemento.producto === producto){
            indexArray = index;
        }

    });
    arrayProductos.splice(indexArray,1);
   GuardarBD();

}

const EditarDB = (producto) => {

    let indexArray = arrayProductos.findIndex((elemento)=>elemento.producto === producto);

    arrayProductos[indexArray].estado=true;
    GuardarBD();
}

//EventListener
formularioUI.addEventListener('submit',(e)=>{

e.preventDefault();
let ProductoUI = document.querySelector('#producto').value;

CrearItem(ProductoUI);
GuardarBD();
formularioUI.reset();

})
document.addEventListener('DOMContentLoaded', PintarDB);

listaProductoUI.addEventListener('click', (e) =>{
    e.preventDefault();

   if(e.target.innerHTML==='done'||e.target.innerHTML ==='delete'){
     const texto =e.path[2].childNodes[2].innerHTML;
    
     if(e.target.innerHTML === 'delete'){
       //acción eliminar
       EliminarBD(texto);
     }
     if(e.target.innerHTML==='done'){
         //accion de editar
         EditarDB(texto);

     }

    }

});
