import { productService } from "../services/products.service.js";
import { validate as uuidValidate } from "uuid";

import { Router } from "express";

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    const products = await productService.getProducts();
    res.status(200).json(products);
});

productsRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params;

    const product = await productService.getProductById(pid);

    if (!pid) {
        return res.status(404).json({ message: "Debe ingresar un id de producto" });
    }

    if (!uuidValidate(pid)) {
        return res.status(400).json({ message: "El id ingresado tiene un formato invalido" });
    }

    if(!product) {
        return res.status(404).json({ error: `Producto con id: ${req.params.pid} no encontrado` });
    }

    res.status(200).json(product);
});

productsRouter.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ message: "Todos los campos son obligatorios, excepto thumbnail" });
    }

    try{
        const product = await productService.createProduct({ title, description, code, price, status, stock, category, thumbnail});
        
        res.status(201).json(product);

    } catch(error) {
        res.status(500).json({ message: "Error al crear el producto" });
    }

});


productsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;

    console.log("Datos recibidos:", pid, title, description, code, price, status, stock, category, thumbnail);

    if (!pid) {
        return res.status(404).json({ message: "Debe ingresar un id de producto" });
    }

    if (!uuidValidate(pid)) {
        return res.status(400).json({ message: "El id ingresado tiene un formato invalido" });
    }

    if (!title || !description || !price || !code || !stock) {
        return res.status(400).json({ message: "Todos los campos son obligatorios, excepto thumbnail" });
    }

    try {
        const product = await productService.updateProduct({ id: pid, title, description, code, price, status, stock, category, thumbnail });

        if (!product) {
            return res.status(404).json({ error: `Producto con id: ${req.params.pid} no encontrado` });
        }

        res.status(200).json({
            message: `El producto con id: ${pid} fue actualizado correctamente.`
        });

    } catch (error)  {
        if (error.message.includes("404")) {
            return res.status(404).json({ error: `Product with ID: ${req.params.pid} not found` });
          }
          return res.status(500).json({ errors: error.message });
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    if (!pid) {
        return res.status(404).json({ message: "Debe ingresar un id de producto" });
    }

    if (!uuidValidate(pid)) {
        return res.status(400).json({ message: "El id ingresado tiene un formato invalido" });
    }

    try{
        const product = await productService.deleteProduct(pid);
        if (!product)
            return res.status(404).json({ error: `Producto con id: ${req.params.pid} no encontrado` });

        res.status(200).json({
            message: `El producto con id: ${pid} fue eliminado correctamente.`,
            product: product
          });

    } catch(error) {
          return res.status(500).json({ errors: error.message });
    }
});


