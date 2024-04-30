const socket = io();

socket.on("connection", () => {
  console.log("Conectado al servidor Websockets!");

  socket.on("productos", (productos) => {
    const listaProductos = document.getElementById("realTimeProducts");
    listaProductos.innerHTML = "";

    productos.forEach((producto) => {
      const li = document.createElement("li");
      li.textContent = `${producto.title} - ${producto.price}`;
      listaProductos.appendChild(li);
    });
  });
});