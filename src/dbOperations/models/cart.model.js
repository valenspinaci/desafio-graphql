import mongoose from "mongoose";

//Crear coleccion
const cartCollection = "carrito";

//Crear esquema a cada documento
const cartSchema = new mongoose.Schema({
    products:[{
        title: String,
        price: Number,
        thumbnail: String,
        timestamp: String,
        stock: Number,
        codigo: String
    }]
})

export {cartCollection, cartSchema}


