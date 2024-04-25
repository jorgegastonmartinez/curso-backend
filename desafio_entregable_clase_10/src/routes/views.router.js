import express from "express";
import { ProductManager } from "../../productManager.js";

const router = express.Router();

const productManager = new ProductManager("desafio_entregable_clase_10/src/productos.json");

productManager.addProduct(
  "BOCATA DE TORTILLA",
  "baguette, tortilla de papas, alioli y tomates secos",
  "ABC123",
  1800,
  true,
  100,
  "Bocatas",
  "ruta/thumbnail/bocata.jpg"
);
productManager.addProduct(
  "ENSALADA VEGETARIANA",
  "Descripción del producto 2",
  "scd12355",
  1600,
  true,
  140,
  "Ensaladas",
  "ruta/thumbnail/ensalada.jpg"
);

router.get("/api/products", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const limit = parseInt(req.query.limit);
        const result = limit ? products.slice(0, limit) : products;

        res.json(result);
    } catch (error) {
        console.error("Error al obtener los productos", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
})

router.get("/api/products/:pid", async (req, res) => {
    try {
        let pid = parseInt(req.params.pid)
        const product = await productManager.getProductById(pid);
        
        if (!product) return res.send({error: `El producto con el ID ${pid} no fue encontrado`})

        res.send({ product });
    } catch (error) {
        console.error("Error al buscar el producto");
        res.status(500).json({error: "error al buscar el producto"})
    }
})

router.post("/api/products", async (req, res) => {
    try {
        const {
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnail,
        } = req.body;
        const codeExists = productManager.getProducts().find(product => product.code === code);
        if (codeExists) {
            return res
              .status(400)
              .json({
                error:
                  "El campo code no se puede repetir, vuelva a intentar con otro código identificador",
              });
        }
        await productManager.addProduct(
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnail
        );
        await productManager.saveProducts();
        res.json({message: "Producto agregado correctamente"});
    } catch (error) {
        console.error("Error al cargar el producto", error);
        res.status(500).json({error: "Ocurrió un error al cargar el producto"})
    }
})

router.put("/api/products/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const updatedProductData = req.body;

        productManager.updateProduct(pid, updatedProductData);

        res.json({message: `El producto con el ID ${pid}, fue actualizado correctamente`})
    } catch (error) {
        console.error("Error al actualizar el producto", error);
        res.status(500).json({error: "Ocurrió un error al intentar actualizar el producto"})
    }
})

router.delete("/api/products/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        productManager.deleteProduct(pid);
        res.json({message: `El producto con el ID ${pid} fue eliminado correctamente!`})
    } catch (error) {
        console.error("Error al eliminar intentar eliminar el producto", error);
        res.status(500).json({error: "No se ha podido eliminar el producto"})
    }
})

router.get("/", (req, res) => {
    res.render("index", {})
})

router.get("/home", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", { products });
    } catch (error) {
        console.error("Error al obtener los productos", error);
        res.status(500).json({error: "Error al obtener los productos"})
    }
})

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("realtimeproducts", { products });
    } catch (error) {
        console.error("Error al obtener los productos");
        res.status(500).json({error: "Error al obtener los productos"})
    }
})

// sockets emit?????'
router.post("/realtimeproducts", async (req, res) => {
    try {
        const {
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnail,
        } = req.body;
        const codeExists = productManager.getProducts().find(product => product.code === code);
        if (codeExists) {
            return res
              .status(400)
              .json({
                error:
                  "El campo code no se puede repetir, vuelva a intentar con otro código identificador",
              });
        }
        await productManager.addProduct(
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnail
        );
        await productManager.saveProducts();
        res.json({message: "Producto agregado correctamente"});

        socket.emit("nuevoProducto", product)
    } catch (error) {
        console.error("Error al cargar el producto", error);
        res.status(500).json({error: "Ocurrió un error al cargar el producto"})
    }
})

export default router;