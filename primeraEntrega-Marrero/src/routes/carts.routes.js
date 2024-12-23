import { Router } from "express";
import { cartService} from "../services/cart.service.js";
import { validate as uuidValidate } from "uuid";

export const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
    try {
        const carts = await cartService.getAll();
        res.status(200).json(carts);
    } catch (error) {
        return res.status(500).json({ errors: error.message });
    }
})

cartRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartService.getById(cid);

        if (!cid) {
            return res.status(404).json({ message: "Please provide a cart ID" });
        }
    
        if (!uuidValidate(cid)) {
            return res.status(400).json({ message: "The provided cart ID format is invalid" });
        }
    
        if(!cart) {
            return res.status(404).json({ error: `Cart with id: ${req.params.pid} no found` });
        }

        if (cart.products.length === 0) {
            return res.status(200).json({ message: "The cart is empty" });
        }

        res.status(200).json(cart.products);
    
    } catch (error) {
        return res.status(500).json({ errors: error.message });
    }
});


cartRouter.post("/", async (req, res) => {
    
    try {
        const cart = await cartService.create();

        res.status(200).json({
            message: `Successfully created Cart with ID: ${cart}.`
          });

    } catch (error) {
        return res.status(500).json({ errors: error.message });
        
    }
});


cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        

        if (!uuidValidate(cid)) {
            return res.status(400).json({ message: "The provided cart ID format is invalid" });
        }
    
        if (!uuidValidate(pid)) {
            return res.status(400).json({ message: "The provided product ID format is invalid" });
        }

        if (!cid) {
            return res.status(404).json({ message: "Please provide a cart ID" });
        }
    
        if (!pid) {
            return res.status(404).json({ message: "Please provide a product ID" });
        }

        const updatedCart = await cartService.addProductToCart(cid, pid);


        if(!updatedCart) {
            return res.status(404).json({ error: `Cart or product no found` });
        }

        res.status(200).json({
            message: `Successfully added product with ID: ${pid} to cart with ID: ${cid}.`
          });

    } catch (error) {

        return res.status(500).json({ "error aqui " : error.message });
    }
});