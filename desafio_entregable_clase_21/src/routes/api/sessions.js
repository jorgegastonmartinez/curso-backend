import { Router } from "express";
import User from "../../models/user.model.js";
import passport from "passport";
import { createHash, isValidPassword } from "../../utils.js";

const router = Router();

// registrar usuario passport
// debo utilizar el middleware
// failureRedirect = si algo falla en el registro lo voy a redireccionar
router.post("/register", passport.authenticate("register", {failureRedirect: "failregister"}), async (req, res) => {
    // voy a enviar 
  
    res.redirect("/login");
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
      role: req.user.role
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


router.post("/logout", (req, res) => {
  
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Error al cerrar la sesión");
        res.redirect("/login")
    });
});

export default router;