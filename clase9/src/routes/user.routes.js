import { Router } from "express";
export const userRoutes = Router();

export const users = [
    {   id : 1, 
        name: "Micaela",
        email: "micaela@gmail.com",
        password: "123456"
    },
    {   id : 2,
        name: "Juan",
        email: "juan@gmail.com",
        password: "123456"
    },
    {   id : 3,
        name: "Pepe",
        email: "pepe@gmail.com",
        password: "123456"
    }
]


userRoutes.get("/", (req, res) => {
    res.json(users);

});


userRoutes.get(":/id", (req, res) => {
    const user = users.find((user) => user.id === req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

})


userRoutes.post ("/" , (req, res) => {
    const {name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const userExist = users.some ((user) => user.email === email);

    if (userExist) {
        return res.status(400).json({ message: "User already exists" });
    } 

    const user = {
        id: users [users.length - 1].id + 1,
        name,
        email
    }

    users.push(user);
    
    return res.status(201).json(`El usuario: ${user} fue creado con exito`)
  
})