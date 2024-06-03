import { Router } from "express";
import User from "../../models/user.model.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        
        const newUser = new User({
          first_name,
          last_name,
          email,
          age,
          password,
          role,
        });
        await newUser.save();
        res.redirect("/login");
    } catch (error) {
        res.status(500).send("Error al registrar usuario")
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({email});
        console.log(user);

        if (!user) return res.status(404).send("Usuario no encontrado");

        if (password !== user.password) {
            return res.status(401).send('Contraseña incorrecta');
        }

        let role = user.role; 
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            role = 'admin';
        }

        req.session.user ={
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: role,
        };
        console.log(req.session.user);
        res.redirect("/products");
    } catch (error) {
        res.status(500).send("Error al iniciar la sessión")
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Error al cerrar la sesión");
        res.redirect("/login")
    });
});

export default router;