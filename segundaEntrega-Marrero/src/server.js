import express from "express";
import { productRouter } from "./routes/products.routes.js";
import {productService} from "./services/product.service.js"
import { viewsRouter } from "./routes/views.routes.js";
import handlebars from "express-handlebars";
import morgan from "morgan";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import { cartRouter } from "./routes/carts.routes.js";
import path from "path";

//Configuracion de express
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "../public")));


//Configuracion de handlebars

app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs"
}));

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));


//Rutas
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//Configuracion de websocket


const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado", socket.id);
    socket.emit("init", productService.products);

});