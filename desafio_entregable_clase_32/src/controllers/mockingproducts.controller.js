import { generateMockProducts } from "../utils.js";
import productModel from "../models/product.model.js"

let mockProducts = [];

export const generateProductsMock = async (req, res) => {
    try {
        mockProducts = generateMockProducts(100);

        await productModel.insertMany(mockProducts);
        res.status(200).json({ message: 'Productos generados con éxito', mockProducts });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar productos', error });
    }
};

export const getProductsMock = async (req, res) => {
    if (mockProducts.length === 0) {
        return res.send({ status: "error", message: "No se generaron productos todavía. Favor de generarlos primero"})
    }
    res.send({ status: "success", payload: mockProducts})
}