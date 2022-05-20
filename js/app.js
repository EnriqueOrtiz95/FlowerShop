const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarProductoBtn = document.querySelector('#vaciar-carrito');
const products = document.querySelector('#products');

// //?icono del carrito
// const imgCarrito = document.querySelector('#img-carrito');

let articulosProducto = [];

cargarEventListeners();
function cargarEventListeners(){
    products.addEventListener('click', agregarProducto);

    carrito.addEventListener('click', eliminarProducto);

    vaciarProductoBtn.addEventListener('click', () => {
        articulosProducto = [];
        limpiarHTML(); //ELIMINAR HTML
    })
}


//?functions
function agregarProducto(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

//?Read HTML content that was clicked and take the course's info.
function leerDatosProducto(producto){
    // console.log(producto);

    //?create an object with the content of the actual course
    const infoProducto = {
        imagen: producto.querySelector('picture img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('p del').textContent,
        id: producto.querySelector('.agregar-carrito').getAttribute('data-id'),
        cantidad: 1
    }

    //*check if an element exists in the carrito
    const existe = articulosProducto.some( producto => producto.id === infoProducto.id);
    if(existe){
        //?update cantidad
        const productos = articulosProducto.map( producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto; //TODO<< return updated course
            }else{
                return producto; //?<<<<< return non-updated ones
            }
        });
        articulosProducto = [ ...productos];
    }else{
        //add article to the carrito
        articulosProducto = [ ...articulosProducto, infoProducto];
    }

    // console.log(infoProducto);
    
    console.log(articulosProducto);
    carritoHTML();
}

//?function eliminarProducto
function eliminarProducto(e){
    // console.log(e.target.classList);
    if(e.target.classList.contains('borrar-producto')){
        const productoId = e.target.getAttribute('data-id');

        //*elimina del arreglo de articuloscarrito por el data-id
        articulosProducto = articulosProducto.filter( producto => producto.id !== productoId);
        //console.log(articulosProducto);

        carritoHTML(); //ITERAR SOBRE EL CARRITO Y MOSTRAR SU HTML
    }
}

function carritoHTML(){

    //clear HTML duplicated
    limpiarHTML();


    //arrange carrito and generate HTML
    articulosProducto.forEach( producto => {
        const { imagen, titulo, precio, cantidad, id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width=100> </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}">X</a>
            </td>
        `;
        //ADD HTML from carrito in the tbody
        contenedorCarrito.appendChild(row);
    })
}

//eliminar productos del tbody
function limpiarHTML(){
    // slow way
    // contenedorCarrito.innerHTML = "";

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}