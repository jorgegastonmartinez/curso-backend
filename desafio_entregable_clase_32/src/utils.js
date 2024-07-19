import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export const generateMockProducts = (count = 100) => {
    const products = [];
    
    for (let i = 0; i < count; i++) {
        const product = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.alphanumeric(10),
            price: parseFloat(faker.commerce.price()),
            stock: faker.number.int({ min: 1, max: 100 }),
            category: faker.commerce.department(),
        };
        
        products.push(product);
    }
    return products;
}

export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;