import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";
import { productService } from "./product.service.js";

class CartService {
    path;
    carts = [];

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

    async getAll() {
        return this.carts;
    }

    async getById(cid) {
        return this.carts.find(cart => cart.id === cid);
    }

    async create() {
        const id = uuidv4();

        const cart = {
            id,
            products: [],
        };

        this.carts.push(cart);

        try {
            await this.saveOnFile();
            return cart.id;

        } catch (error) {
            console.error(`An error occurred while saving the file: ${error.message}`);
        }
    }

    async addProductToCart(cid, pid) {
        const product = await productService.getById(pid);

        if(!product) {
            return null;
        }

        const cart = this.carts.find(cart => cart.id === cid);
        
        console.log(cart)


        if(!cart) {
            return null;
        }


        const productInCart = cart.products.find(item => item.product === pid);

        if (productInCart) {
            console.log(`Product already in cart, increasing quantity`);
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
            console.error(`An error occurred while saving the file: ${error.message}`);
        }
    }

    async saveOnFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error(`An error occurred while saving the file: ${error.message}`);
        }
    }
}

export const cartService = new CartService({
    path: "./src/db/carts.json",
});
