import ProductDAO from '../dao/product/product.dao.js';
import CustomError from '../services/error/CustomError.js';
import EErrors from '../services/error/enums.js';
import { generateProductErrorInfo } from '../services/error/info.js';

const productDAO = new ProductDAO();

export const getProducts = async (req, res) => {
    let { limit = 10, page = 1, sort, query } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    try {
        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { category: query },
                    { stock: { $gt: 0 } }
                ]
            };
        }

        let sortOptions = {};
        if (sort) {
            sortOptions.price = sort === "asc" ? 1 : -1;
        }

        const { products, totalProducts } = await productDAO.getProducts(filter, sortOptions, limit, page);
        const totalPages = Math.ceil(totalProducts / limit);

        const response = {
            status: "success",
            payload: products,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/products?limit=${limit}&page=${page - 1}&sort=${sort || ''}&query=${query || ''}` : null,
            nextLink: page < totalPages ? `/products?limit=${limit}&page=${page + 1}&sort=${sort || ''}&query=${query || ''}` : null
        };

        res.json(response);
    } catch (error) {
        console.error("Error al recuperar productos", error);
        res.status(500).json({ status: "error", message: "Error Interno del Servidor" });
    }
};

export const getProductById = async (req, res) => {
    try {
        let { pid } = req.params;
        const product = await productDAO.getProductById(pid);
        if (!product) {
            return res.status(400).send({ error: "Producto no encontrado" });
        }
        res.send({ result: "success", payload: product });

    } catch (error) {
        console.error("Error al obtener el producto", error);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

export const createProduct = async (req, res, next) => {
    let { title, description, code, price, stock, category } = req.body;
    console.log("Datos recibidos:", req.body);
    try {

        if (!title || !description || !code || !price || isNaN(stock) || !category) {
        const error = CustomError.createError({
            name: "Creación de Producto",
            cause: generateProductErrorInfo({ title, description, code, price, stock, category }),
            message: "Debes completar correctamente todos los campos",
            code: EErrors.INVALID_TYPES_ERROR
        });
        return next(error);
    }
        stock = Number(stock);
        if (stock <= 0) {
            const error = CustomError.createError({
                name: "Creación de Producto",
                cause: `Stock recibido: ${stock}`,
                message: "El campo STOCK debe ser mayor que 0",
                code: EErrors.INVALID_TYPES_ERROR
            });
            return next(error);
        }
        const codeExists = await productDAO.existsByCode(code);

        if (codeExists) {
            const error = CustomError.createError({
                name: "Creación de Producto",
                cause: `Código ya existente: ${code}`,
                message: "El campo code ya existe con ese número",
                code: EErrors.INVALID_PARAM
            });
            return next(error);
        }

        const result = await productDAO.createProduct({
            title,
            description,
            code,
            price,
            stock,
            category,
        });

        res.status(201).send({ result: "success", payload: result });
    
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res) => {
    let { pid } = req.params;
    let productToUpdate = req.body;

    if (!productToUpdate.title || !productToUpdate.description || !productToUpdate.code || !productToUpdate.price || isNaN(productToUpdate.stock) || !productToUpdate.category) {
        return res.status(400).send({ status: "Error", error: "Debe completar todos los campos del producto" });
    }

    try {
        const product = await productDAO.getProductById(pid);
        if (!product) {
            return res.status(400).send({ error: "Producto no encontrado" });
        }

        const codeExists = await productDAO.existsByCode(productToUpdate.code, pid);

        if (codeExists) {
            return res.status(400).send({ error: "El campo code ya está siendo utilizado por otro producto" });
        }

        const result = await productDAO.updateProduct(pid, productToUpdate);

        res.send({ result: "success", payload: result });

    } catch (error) {
        console.error("Error al actualizar el producto", error);
        res.status(500).send({ error: "Error al actualizar el producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        let { pid } = req.params;
        await productDAO.deleteProduct(pid);
        res.send({ result: "success", payload: { deletedCount: 1 } });
    } catch (error) {
        console.error("El producto no se ha podido eliminar", error);
        res.status(500).send({ error: "El producto no se ha podido eliminar" });
    }
};