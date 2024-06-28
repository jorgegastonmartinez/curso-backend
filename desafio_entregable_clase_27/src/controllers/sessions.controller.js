import passport from "passport";

export const registerUser = passport.authenticate("register", { failureRedirect: "failregister" }, (req, res) => {
  res.redirect("/login");
});

export const failRegister = (req, res) => {
  console.log("Estrategia fallida");
  res.send({ error: "Falló" });
};

export const loginUser = passport.authenticate("login", { failureRedirect: "faillogin" }, async (req, res) => {
  if (!req.user) {
    res.status(400).send({ status: "Error", error: "Campos incompletos" });
    return;
  }
  try {
    req.session.user = {
      _id: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
    };
    res.redirect("/products");
  } catch (error) {
    res.status(500).send("Error en el inicio de sesión");
  }
});

export const failLogin = (req, res) => {
  res.send({ error: "Login fallido" });
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error al cerrar la sesión");
    res.redirect("/login");
  });
};

export const getCurrentUser = (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.redirect("/login");
    }
    res.render("current", { user: req.session.user });
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error);
    return res.status(500).send({ error: "Error al obtener el usuario actual" });
  }
};

export const githubAuth = passport.authenticate("github", { scope: ["user.email"] });

export const githubCallback = passport.authenticate("github", { failureRedirect: "/login" }, (req, res) => {
  req.session.user = req.user;
  res.redirect("/products");
});
