import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import path from "path";

//socket
import { Server } from "socket.io";

//Creamos y configuramos servidor express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

// Handlebars config
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//Routes

app.use("/", viewsRouter);

//Referencia a nuestro servidor express HTTP
const httpServer = app.listen(8080, () => {
    console.log("Servidor corriendo en el puerto 8080");
});

//Creamos servidor de websockets
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    console.log(socket.id);

    socket.on("mensaje", (data) => {
        console.log("Mensaje recibido: ",data);
    });

    socket.emit("mensajeServer", "Hola desde el servidor");

    //manda mensaje a todos los clientes que esten conectados excepto el que envio el mensaje
    socket.broadcast.emit("mensaje-broadcast", "Hola desde el servidor pero broadcast");

    io.emit("mensaje-all", "Hola desde el servidor a todos");
});