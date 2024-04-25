const socket = io();

socket.on("connection", () => {
    console.log("Conectado al servidor Websockets!");
});

socket.on("mensajeAlCliente", (data) => {
    console.log("Mensaje del servidor:", data);
});

socket.emit("mensajeDelCliente", {mensaje: "Hola desde el cliente"})