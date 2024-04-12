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
        const index = this.products.findIndex(product => product.id === product_id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };

            this.saveProducts();
            
            console.log(`El Producto con el ID ${product_id} fue actualizado exitosamente!`);
        } else {
            console.log(`No se encontró ningún producto con el ID ${product_id}.`);
        }
    }

    deleteProduct(product_id) {
        const productIndex = this.products.findIndex(product => product.id === product_id);

        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
            
            console.log(`El Producto con ID ${product_id} fue eliminado exitosamente.`);
        } else {
            console.log(`No se encontró ningún producto con el ID ${product_id}.`);
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
    500,
    "sin imagen1",
    "abc123",
    25
);

productManager.addProduct(
    "producto prueba 2",
    "esto es un producto prueba",
    500,
    "sin imagen1",
    "dfg654",
    25
);

productManager.addProduct(
    "producto prueba 3",
    "esto es un producto prueba",
    500,
    "sin imagen1",
    "abc123",
    25
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
    code: "abc123",
    stock: 30
};

productManager.updateProduct(2, productoModificado);
console.log(productoModificado);

productManager.deleteProduct(1);

productManager.deleteProduct(2);

productManager.deleteProduct(4);

console.log(product);

productManager.addProduct(
    "producto prueba 3",
    "esto es un producto prueba",
    500,
    "sin imagen1",
    "abc1235",
    25
);

productManager.addProduct(
    "producto prueba 7",
    "esto es un producto prueba",
    500,
    "sin imagen1",
    "abc1235",
    25
);

productManager.addProduct(
    "producto prueba 8",
    "esto es un producto prueba",
    500,
    "sin imagen1",
    "dfg654444544544",
    25
);

console.log(productList);