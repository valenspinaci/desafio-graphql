import express from "express";
import { productsRouter } from "./api/products.routes.js";

const router = express.Router()

router.get("/",(req,res)=>{
    res.send("Bienvenido")
})

router.use("/products", productsRouter)

export {router};