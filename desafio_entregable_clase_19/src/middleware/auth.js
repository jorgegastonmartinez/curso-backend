// aca esta el middleware de auth
// como la consigna da la especificacion de que hacer en 2 casos
// 1 si esta autenticado que me mande al perfil 
// 2 si no esta autenticado que me mande al login

// si esta autenticado pasa
export const isAuthenticated = (req, res, next) => {
    // si existe, quiere decir que esta autenticado
    if (req.session.user) {
        // si es true, permite continuar
        return next();

        // caso contrario que no existe, me redirige al login
    } else {
        res.redirect("/login");
    }
};

// si no esta autenticado me redirige al
export const isNotAuthenticated = (req, res, next) => {
    // si no esta autenticado en la session
    // por ende el middleware llama a next() permitiendo que siga al siguiente paso
    if (!req.session.user) {
        return next();

        // aca va el caso contrario
        // si esta autenticado se redirige a la vista profile
    } else {
        res.redirect("/profile")
    }
};