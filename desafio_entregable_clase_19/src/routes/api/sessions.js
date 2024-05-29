// aqui van las rutas de las sessions

import { Router } from "express";
import User from "../../models/user.model.js";

const router = Router();

// registrar usuario
router.post("/register", async (req, res) => {
    // tomamos los datos de los campos
    const { first_name, last_name, email, age, password } = req.body;
    try {
        // crea el usuario con esos datos
        const newUser = new User({
          first_name,
          last_name,
          email,
          age,
          password,
        });
        // guarda al nuevo usuario
        await newUser.save();
        // si esta todo ok te lleva al login
        res.redirect("/login");
    } catch (error) {
        res.status(500).send("Error al registrar usuario")
    }
});

// loguiar usuario
router.post("/login", async (req, res) => {
    // tomo estos datos del usuario
    const {email, password} = req.body;
    console.log(email, password);
    try {
        // a traves del email (como modelo unico de indentificacion) lo busco
        // aqui tambien se podria validar el password
        // habria que encriptar el password
        const user = await User.findOne({email});
        console.log(user);
        // si el usuario no fue encontrado arrojo el error
        if (!user) return res.status(404).send("Usuario no encontrado");
        // caso contrario lo registro
        req.session.user ={
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
        };
        // si son correctos los datos ingresados
        // voy a rederigir al usuario a la pantalla de profile
        console.log(req.session.user);
        res.redirect("/profile");
    } catch (error) {
        res.status(500).send("Error al iniciar la sessión")
    }
});

// endpoint de logout
router.post("/logout", (req, res) => {
    // con destroy elimino los datos de la session
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Error al cerrar la sesión");
        // luego me redirige el login
        res.redirect("/login")
    });
});

export default router;