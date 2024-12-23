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

/**
 * 
 * @returns Array of products
 * 
 */
async getProducts() {
    return this.products;
}


async getProductById(id) {
    return this.products.find(prod => prod.id === id);
}


async createProduct(
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnail
){
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
        console.log(`Error al guardar el archivo: ${error}`);

    }
}

async updateProduct(
    id,
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnail
){
    const product = this.getProductById(id);
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
        console.log(`Error al actualizar el archivo: ${error}`);
        return null;
    }
}

deleteProduct({ id } ) {
    const product = this.getProductById(id);
    if(!product) {
        return null;
    }

    const index = this.products.findIndex(prod => prod.id === id);
    this.products.splice(index, 1);

    try{
        this.saveOnFile();
        return product;
    }catch(error) {
        console.log(`Error al eliminar el archivo: ${error}`);
        return null;
    }
}

async saveOnFile() {

    try{
        await fs.promises.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch(error) {
        console.log(`Error al guardar el archivo: ${error}`);
    }
}

}

export default new ProductService({ path: "./src/db/products.json" });
