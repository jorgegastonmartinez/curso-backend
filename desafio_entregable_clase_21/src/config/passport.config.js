import passport from "passport";
import local from "passport-local";
import userService from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const localStrategy = local.Strategy

// aqui van las estrategias dentro de la misma function van las del register y login
const initializePassport = () => {

        // estrategias para el register
    passport.use("register", new localStrategy(

        // callback
        {passReqToCallback: true, usernameField: "email"}, async(req,username, password,done) => {
            const {first_name, last_name, email, age} = req.body;
            try {
                // buscar el usuario en la base de datos
                // a traves del model.user
                let user = await userService.findOne({email:username})
                    if (user) {
                        console.log("El usuario ya existe")
                        return done(null, false)
                    }
                const newUser = {
                    first_name,
                    last_name, 
                    email, 
                    age,
                    password: createHash(password)
                }
                let result = await userService.create(newUser);
                return done(null, result)
            } catch (error) {
                return done("Error al obtener el usuario" + error)
            }
        }
    ))

    // SERIALIZAR 
    passport.serializeUser((user, done) => {
        // user._id por asi no los proporciona mongo
        done(null, user._id)
    })

    // DESERIALIZAR
    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id)

        done(null, user)
    })

    // estrategia para el login

    passport.use("login", new localStrategy({usernameField:"email"}, async (username, password, done) => {
        // buscar en la base de datos con el userService
        // validar el password en la base de datos
        try {
            const user = await userService.findOne({ email: username });
            if (!user) {
                console.log("El usuario no existe");
                return done(null, user)
            }
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user)
        } catch (error) {
            return (done, error)
        }
    }))
}

export default initializePassport;