const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
        } catch (error) {
            console.error("Error al guardar los productos:", error);
        }  
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if(!title || !description || !price || ! thumbnail || !code || isNaN(stock)) {
            console.log("Debe completar correctamente todos los campos!!!");
            return;
        }

        const codeExists = this.products.find((product) => product.code === code);
        if(codeExists) {
            console.log("El campo code no se puede repetir, vuelva a intentar con otro código identificador");
            return;
        }

        const product_id = this.products.length + 1;

        const product = {
            id: product_id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(product);

        this.saveProducts();
    }

    getProductById(product_id) {
        const productFound = this.products.find((product) => product.id === product_id);
        if(!productFound) {
            console.log("Not Found");
        }
        return productFound;
    }

    updateProduct(product_id, updatedProduct) {
        const productToUpdate = this.products.find(product => product.id === product_id);

        if (productToUpdate) {
            this.products = this.products.filter(product => product.id !== product_id);
            this.products.push({ ...productToUpdate, ...updatedProduct });

            this.saveProducts();

            console.log(`El Producto con el ID ${product_id}, fue actualizado correctamente`);
        } else {
            console.log(`No se ha encontrado ningún Producto con el ID: ${product_id}`);
        }
    }

    deleteProduct(product_id) {
        const productToDelete = this.products.find(product => product.id === product_id);

        if (productToDelete) {
            this.products = this.products.filter(product => product.id !== product_id);

            this.saveProducts();

            console.log(`El Producto con el ID ${product_id}, fue eliminado exitosamente!`);
        } else {
            console.log(`No se encontró ningún producto con el ID ${product_id}`);
        }
    }
}

// TESTING
const productManager = new ProductManager("desafio_entregable_clase_04/productos.json");

const productList = productManager.getProducts();
console.log(productList);

productManager.addProduct(
    "producto prueba",
    "esto es un producto prueba",
    100,
    "sin imagen1",
    "abc123",
    25
);

productManager.addProduct(
    "producto prueba 2",
    "esto es un producto prueba",
    200,
    "sin imagen1",
    "dfg654",
    25
);

productManager.addProduct(
    "producto prueba 3",
    "esto es un producto prueba",
    300,
    "sin imagen1",
    "abc12333555353",
    2242
);

productManager.addProduct(
    "producto prueba 4",
    "esto es un producto prueba",
    400,
    "sin imagen4",
    "abc123979779",
    99
);

productManager.addProduct(
    "producto prueba 5",
    "esto es un producto prueba",
    500,
    "sin imagen5",
    "abc1239988",
    334
);

productManager.addProduct(
    "producto prueba 6",
    "esto es un producto prueba",
    600,
    "sin imagen6",
    "abc12399886",
    3346
);

productManager.addProduct(
    "producto prueba 7",
    "esto es un producto prueba",
    5007,
    "sin imagen7",
    "abc12399887",
    3347
);

productManager.addProduct(
    "producto prueba 8",
    "esto es un producto prueba",
    5008,
    "sin imagen8",
    "abc12399888",
    3348
);

productManager.addProduct(
    "producto prueba 9",
    "esto es un producto prueba",
    5009,
    "sin imagen9",
    "abc12399889",
    3349
);

productManager.addProduct(
    "producto prueba 10",
    "esto es un producto prueba",
    5001,
    "sin imagen10",
    "abc123998810",
    334
);

productManager.addProduct(
    "producto prueba 11",
    "esto es un producto prueba",
    50011,
    "sin imagen5",
    "abc1239988",
    33411
);

productManager.addProduct(
    "producto prueba 12",
    "esto es un producto prueba",
    50012,
    "sin imagen5",
    "abc1274574712",
    336612
);

productManager.addProduct(
    "producto prueba 13",
    "esto es un producto prueba",
    50013,
    "sin imagen13",
    "abc123452135",
    33513
);

const product = productManager.getProducts();
console.log(product);

const productoEncontrado = productManager.getProductById(1);
    if(productoEncontrado) {
        console.log("El producto buscado es: ", productoEncontrado);
    } else {
        console.log("No se ha encontrado el producto solicitado");
    }

// Modificacion de un product
const productoModificado = {
    title: "Nuevo título modificaado",
    description: "Nueva descripción modificada",
    price: 4000,
    thumbnail: "nueva-imagen.jpg",
    code: "abc12356789",
    stock: 30
};

productManager.updateProduct(2, productoModificado);
console.log(productoModificado);

productManager.deleteProduct(4);

productManager.deleteProduct(8);
