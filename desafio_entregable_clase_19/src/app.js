import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";

import viewsRouter from "./routes/views.js";
import sessionsRouter from "./routes/api/sessions.js";



const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(
    session({
        secret: "secretKey",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl:
            "mongodb+srv://Mongojoje:Mongojoje@cluster0.z5uj2rj.mongodb.net/ecommerse?retryWrites=true&w=majority&appName=Cluster0" }),
        // cookie: { maxAge: 180 * 60 * 1000 },
    })
);

app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})