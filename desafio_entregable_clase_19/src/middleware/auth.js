// aca esta el middleware de auth
// como la consigna da la especificacion de que hacer en 2 casos
// 1 si esta autenticado que me mande al perfil 
// 2 si no esta autenticado que me mande al login

// si esta autenticado pasa
export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect("/login");
    }
};

export const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        res.redirect("/products")
    }
};