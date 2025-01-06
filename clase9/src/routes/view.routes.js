import { Router } from "express";
import { users }  from "../routes/user.routes.js"; 

export const viewsRoutes = Router();

viewsRoutes.get("/", (req, res) => {
    const { usuario } = req.query;

    res.render("home",
        {
            title: "Home",
            fechaActual : new Date().toLocaleDateString(),
            usuario: usuario ? usuario: "Invitado"

        }
    );

}) 

viewsRoutes.get("/about" , (req, res) => {
    res.render("about", {title: "About"});
});

viewsRoutes.get("/protected" , (req, res) => {

    
    res.render("protected", 
        {title: "Protected",
        esAdmin: true,
        datos: users
        }
    );
});