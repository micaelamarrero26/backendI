import express from "express";
import { userRoutes } from "./routes/user.routes.js";
import handlebars from "express-handlebars";
import { __dirname } from "./dirname.js";
import path from "path";
import { viewsRoutes } from "./routes/view.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "../public")));


//configuracion del motor de engine 

app.engine(
    "hbs", 
    handlebars.engine({
        defaultLayout: "main",
        extname: ".hbs"
    })
);

//Configuracion de las carpetas de las vistas
app.set("views", path.join(__dirname, "views"));

//Motor de plantilla
app.set("view engine", "hbs");

//Rutas
app.use("/api/users", userRoutes);
app.use("/", viewsRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



