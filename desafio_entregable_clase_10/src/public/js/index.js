const socket = io();
const listProducts = document.getElementById('listProducts');

socket.on('productos', productos => {
  
  listProducts.innerHTML = "";
  productos.forEach(producto => {
    const product = document.createElement("h4");

    product.innerHTML = `Producto: ${producto.title} - Precio $${producto.price}`

    listProducts.appendChild(product)
  });
})