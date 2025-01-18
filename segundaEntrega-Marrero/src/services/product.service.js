import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";

class ProductService {

    path;
    products;

    constructor({ path }) {
        this.path = path;
        if(fs.existsSync(this.path)) {
            try{
                this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch(error) {
                this.products = [];
        }
        }else{
            this.products = [];
        }
    }

    async getAll() {
        return this.products;
    }


    async getById(id) {
        return this.products.find(prod => prod.id === id);
    }


    async create({
        title,
        description,
        code,
        price,
        status = true,
        stock,
        category,
        thumbnail,
    }){
        const id = uuidv4();

        const product = {
            id,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail,
        };

        this.products.push(product);

        try{
            this.saveOnFile();
            return product;
        }catch(error) {
            console.error(`An error occurred while saving the file: ${error.message}`);

        }
    }

    async update({
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    }){
        const product = this.products.find((product) => product.id === id);

        if(!product) {
            return null;
        }

        product.title = title ?? product.title;
        product.description = description ?? product.description;
        product.code = code ?? product.code;
        product.price = price ?? product.price;
        product.status = status ?? product.status;
        product.stock = stock ?? product.stock;
        product.category = category?? product.category;
        product.thumbnail = thumbnail?? product.thumbnail;

        const index = this.products.findIndex(prod => prod.id === id);
        this.products[index] = product;

        try{
            await this.saveOnFile();
        
            return product;
        }catch(error) {
            console.error(`An error occurred while saving the file: ${error.message}`);
            return null;
        }
    }

    async delete( id ) {

        const product = this.products.find((prod) => prod.id === id);
        
        console.log(product);

        if (!product) return null;
        
        const index = this.products.findIndex(prod => prod.id === id);

        this.products.splice(index, 1);

        try{
            this.saveOnFile();
            return product;
        }catch(error) {
            console.error(`An error occurred while saving the file: ${error.message}`);
            return null;
        }
    }

    async saveOnFile() {

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch(error) {
            console.error(`An error occurred while saving the file: ${error.message}`);
        }
    }

}

export const productService = new ProductService({
    path: "./src/db/products.json",
});