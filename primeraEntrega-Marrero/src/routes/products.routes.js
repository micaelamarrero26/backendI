import { productService }  from "../services/products.service.js";

const productsRouter = express.Router();

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

    if(!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product);
});

productsRouter.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;

    if (!title || !description || !price || !code || !stock) {
        return res.status(400).json({ message: "Todos los campos son obligatorios, excepto thumbnail" });
    }

    try{
        const product = await productService.createProduct({ title, description, price, thumbnail, code, stock });
        res.status(201).json(product);

    } catch(error) {
        res.status(500).json({ message: "Error al crear el producto" });
    }

});


productsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!pid) {
        return res.status(404).json({ message: "Debe ingresar un id de producto" });
    }

    if (!title || !description || !price || !code || !stock) {
        return res.status(400).json({ message: "Todos los campos son obligatorios, excepto thumbnail" });   
    }

    try{
        const product = await productService.updateProduct(pid, { title, description, price, thumbnail, code, stock });
        res.status(200).json(product);

    } catch(error) {
        res.status(500).json({ message: "Error al actualizar el producto" });
    }

});

productsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    if (!pid) {
        return res.status(404).json({ message: "Debe ingresar un id de producto" });
    }

    try{
        const product = await productService.deleteProduct(pid);
        res.status(200).json(product);

    } catch(error) {
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
});
