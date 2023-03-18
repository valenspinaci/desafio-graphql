import express from "express";
import { graphqlController } from "./controllers/products.graphql.controller.js";
import { router } from "./routes/index.js";

const app = express();
export const admin = true;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", router)

app.use("/graphql", graphqlController())

const PORT = process.env.port || 8080;
app.listen(PORT, ()=>(console.log(`Servidor inicializado en puerto ${PORT}`)));

export{app};