export const generateUserErrorInfo = (user) => {
    return `Una o más propiedades está incompleta o no es válida.
    Lista de propiedades:
    * first_name: Necesita ser una cadena de String, se recibió ${user.first_name}
    * last_name: Necesita ser una cadena de String, se recibió ${user.last_name}
    * email: Debe tener un dominio válido ${user.email}
    * age: Necesita ser un Number, se recibió ${user.age}
    * password: Debe tener al menos 8 caracteres de longitud y al menos una letra minúscula. Se recibió ${user.password}
    `
}

export const generateProductErrorInfo = (product) => {
    return `Una o más propiedades está incompleta o no es válida.
    Lista de propiedades:
    * title: Necesita ser una cadena de String, se recibió ${product.title}
    * description: Necesita ser una cadena de String, se recibió ${product.description}
    * code: Necesita ser una cadena de String, se recibió ${product.code}
    * price: Necesita ser un número positivo, se recibió ${product.price}
    * stock: Necesita ser un número mayor a 0, se recibió ${product.stock}
    * category: Necesita ser una cadena de String, se recibió ${product.category}
    `;
};