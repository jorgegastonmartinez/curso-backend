// aca van las vistas de las rutas de las sessions

import { Router } from "express";
import { isAuthenticated, isNotAuthenticated } from "../middleware/auth.js";

const router = Router();

// todas estas rutas tienen un middleware entre medio del endpoint y el cuerpo de la respuesta
router.get("/login", isNotAuthenticated, (req, res) => {
    res.render("login");
});

router.get("/register", isNotAuthenticated, (req, res) => {
    res.render("register")
});

router.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile", { user: req.session.user });
});

export default router;