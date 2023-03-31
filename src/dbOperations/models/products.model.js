import mongoose from "mongoose";

//Crear coleccion
const productsCollection = "productos";

//Crear esquema a cada documento
const productsSchema = new mongoose.Schema({
    title: String,
    price: Number,
    category: String,
    thumbnail: String,
    stock: Number,
    codigo: String
},
{
    timestamps:true
})

export {productsCollection, productsSchema};