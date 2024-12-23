import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";
import { productService } from "./products.service.js";

class CartsService {
    path;
    carts;

    constructor({ path }) {
        this.path = path;
        if (fs.existsSync(this.path)) {
            try {
                this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                this.carts = [];
            }
        } else {
            this.carts = [];
        }
    }

    // Obtener un carrito por ID
    async getCartsById(cid) {
        return this.carts.find(cart => cart.id === cid);
    }

    // Crear un nuevo carrito
    async createCart() {
        const id = uuidv4();

        const cart = {
            id,
            products: [],
        };

        this.carts.push(cart);

        try {
            await this.saveOnFile();
            return cart;
        } catch (error) {
            console.log(`Error al guardar el archivo: ${error}`);
            throw error;
        }
    }

    async addProductToCart(cid, pid) {
        const product = await productService.getProductById(pid);
        if (!product) {
            throw new Error("Producto no encontrado");
        }

        const cart = this.carts.find(cart => cart.id === cid);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const productInCart = cart.products.find(item => item.product === pid);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({
                product: pid, 
                quantity: 1,
            });
        }

        try {
            await this.saveOnFile();
            return cart;
        } catch (error) {
            console.log(`Error al guardar el archivo: ${error}`);
            throw error;
        }
    }

    // Guardar los cambios en el archivo
    async saveOnFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.log(`Error al guardar el archivo: ${error}`);
        }
    }
}

export const cartService = new CartsService({
    path: "./src/db/carts.json",
});
