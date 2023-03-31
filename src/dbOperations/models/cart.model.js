import mongoose from "mongoose";
import { productsSchema } from "./products.model.js";

//Crear coleccion
const cartCollection = "carrito";

//Crear esquema a cada documento
const cartSchema = new mongoose.Schema({
    products : [{
        productsSchema
    }]
})

export {cartCollection, cartSchema}


//title: String,
//price: Number,
//thumbnail: String,
//timestamp: String,
//stock: Number,
//codigo: String