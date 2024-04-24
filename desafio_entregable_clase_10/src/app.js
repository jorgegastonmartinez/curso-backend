import express from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", viewsRouter);
app.use(express.static(__dirname + "/public"))
app.engine("handlebars", handlebars.engine);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", productsRouter);