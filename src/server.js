import express from "express";
import { graphqlController } from "./controllers/products.graphql.controller.js";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import {options} from "./config/options.js";
import {getApi} from "./dbOperations/index.js";
import __dirname from "./util.js";
import { ContenedorArchivos } from "./dbOperations/managers/file.manager.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { normalize, schema } from "normalizr";

const {ContenedorDAOProductos} = await getApi(options.server.DB_TYPE);
const {ContenedorDAOCarts} = await getApi(options.server.DB_TYPE);
const messages = new ContenedorArchivos("src/chat/DB_CHAT.txt");

const app = express();
export const admin = true;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));

const PORT = process.env.port || 8080;
const server = app.listen(PORT, ()=>(console.log(`Servidor inicializado en puerto ${PORT}`)));

//Cookie parser
app.use(cookieParser());

//Configuracion de la sesion
app.use(session({
    store: MongoStore.create({
        mongoUrl: options.mongoDB.dbURL,
    }),
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:600000}
}))

app.use("/", router)

app.use("/graphql", graphqlController())

//Vinculacion de passport con el servidor
app.use(passport.initialize());
app.use(passport.session());

//Configurar servidor para indicarle que usaremos motor de plantillas
app.engine("handlebars", handlebars.engine());

//Indicar donde están las vistas
app.set("views", __dirname + "/views");

//Indicar el motor que usaré en express
app.set("view engine", "handlebars");


//Configurar websocket del lado del servidor
const io = await new Server(server);

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    //Productos
    //Cada vez que socket se conecte le envio los productos
    socket.emit("products", await ContenedorDAOProductos.getAll());
    socket.on("newProduct", async (data) => {
        await ContenedorDAOProductos.save(data);
        io.sockets.emit("products", await ContenedorDAOProductos.getAll())
    });

    //Chat
    //Enviar los mensajes al cliente
    socket.emit("messagesChat", await normalizarMensajes());
    //Recibimos el mensaje
    socket.on("newMsg", async (data) => {
        await messages.save(data);
    //Enviamos los mensajes a todos los sockets que esten conectados.
        io.sockets.emit("messagesChat", await normalizarMensajes())
    })
    })

//Normalizacion
const authorSchema = new schema.Entity("authors",{},{idAttribute:"email"})
const messageSchema = new schema.Entity("messages",{
    author:authorSchema
})

//Esquema global
const chatSchema = new schema.Entity("chats",{
    messages:[messageSchema]
})

//Aplicar normalizacion
//Funcion que normaliza datos
const normalizarData = (data)=>{
    const dataNormalizada = normalize({id:"chatHistory", messages:data}, chatSchema)
    return dataNormalizada;
}

//Funcion que normaliza mensajes
const normalizarMensajes = async()=>{
    const messagesChat = await messages.getAll()
    const mensajesNormalizados = normalizarData(messagesChat);
    return mensajesNormalizados;
}

export{app};