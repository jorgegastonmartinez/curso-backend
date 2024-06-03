import { Router } from "express";
// import User from "../../models/user.model.js";
import passport from "passport";
// import { createHash, isValidPassword } from "../../utils.js";

const router = Router();

// router.post("/register", async (req, res) => {
//     const { first_name, last_name, email, age, password } = req.body;
//     try {
//         const newUser = new User({
//           first_name,
//           last_name,
//           email,
//           age,
//           password: createHash(password),
//           role,
//         });
//         await newUser.save();
//         res.redirect("/login");
//     } catch (error) {
//         res.status(500).send("Error al registrar usuario")
//     }
// });



// registrar usuario passport
// debo utilizar el middleware
// failureRedirect = si algo falla en el registro lo voy a redireccionar
router.post("/register", passport.authenticate("register", {failureRedirect: "failregister"}), async (req, res) => {
    // voy a enviar 
    res.send({status: "success", message: "Usuario registrado correctamente" })
  });
  
  // aca voy a captar el  failureRedirect, a traves de un get
  // es decir le voy a dar la respuesta a la solicitud post si anda mal
  router.get("/failregister", async (req, res) => {
    console.log("Estrategia fallida")
    res.send({error: "Falló"})
  })



// loguiar usuario
//NUEVO VOY A AGREGAR isValidPassword al momento de loguearse

router.post("/login", passport.authenticate("login", {failureRedirect: "faillogin"}), async (req, res) => {

    if (!req.user) {
      res.status(400).send({ status: "Error", error: "Campos incompletos" });
      return;
    }
    try {
    req.session.user ={
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };
    // si son correctos los datos ingresados
    // voy a rederigir al usuario a la pantalla de profile
    res.redirect("/products");

    } catch (error) {
    res.status(500).send("Error en el inicio de sesion")
    }
});

// aca voy a captar el  failureRedirect, a traves de un get
// es decir le voy a dar la respuesta a la solicitud post si anda mal
router.get("/faillogin", (req, res) => {
  res.send({error: "Login fallido"})
})





// router.post("/login", async (req, res) => {
//     const {email, password} = req.body;
//     console.log(email, password);
//     try {
//         const user = await User.findOne({email});
//         console.log(user);

//         if (!user) return res.status(404).send("Usuario no encontrado");

//         if (password !== user.password) {
//             return res.status(401).send('Contraseña incorrecta');
//         }

//         let role = user.role; 
//         if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//             role = 'admin';
//         }

//         req.session.user ={
//             id: user._id,
//             first_name: user.first_name,
//             last_name: user.last_name,
//             email: user.email,
//             age: user.age,
//             role: role,
//         };
//         console.log(req.session.user);
//         res.redirect("/products");
//     } catch (error) {
//         res.status(500).send("Error al iniciar la sessión")
//     }
// });

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Error al cerrar la sesión");
        res.redirect("/login")
    });
});

export default router;