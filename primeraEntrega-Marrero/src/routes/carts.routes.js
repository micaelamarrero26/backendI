import { Router } from "express";
import { cartService} from "../services/carts.service.js";


export const cartsRouter = Router();

cartsRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartService.getCartsById(cid);

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        res.status(200).json(cart.products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el carrito" });
    }
});


cartsRouter.post("/", async (req, res) => {
    
    try {
        const cart = await cartService.createCart();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el carrito" });
    }
});


cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const updatedCart = await cartService.addProductToCart(cid, pid);

        res.status(200).json(updatedCart);
    } catch (error) {
        if (error.message === "Carrito no encontrado") {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        if (error.message === "Producto no encontrado") {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        console.error("Error al agregar producto al carrito:", error);
        res.status(500).json({ message: "Error al agregar el producto al carrito" });
    }
});