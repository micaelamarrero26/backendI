import { Router } from "express";
import { productService } from "../services/product.service.js";

export const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
    const products = await productService.getAll();
    res.render("home", { products });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts");
});