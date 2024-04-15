const express = require("express"); 
const PORT = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
const ProductManager = require("../../desafio_entregable_clase_04/productos.json")

app.get("/products", async (req, res) => {
    try {
        const products = await ProductManager;
        const limit = parseInt(req.query.limit);
        const result = limit ? products.slice(0, limit) : products;
    
        res.json(result);

    } catch (error) {
        console.error("Error al obtener los Productos", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

app.get("/products/:pid", async (req, res) => {
    const products = await ProductManager;

    console.log(products);

    let pid = parseInt (req.params.pid)

    let product = products.find(product => product.id === pid)

    if (!product) return res.send({ error: "Producto no encontrado" });

    res.send({product})
});

app.listen(PORT, () => {
    console.log(`Server en el PORT: ${PORT}`);
})
