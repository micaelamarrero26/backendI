console.log("main.js loaded");

const socket = io();


socket.emit("mensaje", "Hola desde el cliente");


socket.on("mensajeServer", (data) => {

    console.log(data);
    
})

socket.on("mensaje-broadcast", (data) => {

    console.log(data);

})

socket.on("mensaje-all" , (data) => {

    console.log(data);
})