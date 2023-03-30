import {productsCollection, productsSchema} from "./models/products.model.js";
import { cartCollection, cartSchema } from "./models/cart.model.js";
import { connectMongoDB } from "../config/dbConnection.js";
import { connectFirebase } from "../config/dbConnection.js";

export async function getApi(databaseType){
    databaseType = process.env.DB_TYPE;
    let ContenedorDAOProductos;
    let ContenedorDAOCarts;

    if(databaseType == "archivos"){
        const {CartsDAOArchivos} = await import ("./daos/carts/cartsArchivos.js");
        ContenedorDAOCarts = new CartsDAOArchivos("./dbTxt/chat.txt");
        const {ProductsDAOArchivos} = await import ("./daos/products/productsArchivos.js");
        ContenedorDAOProductos = new ProductsDAOArchivos("./dbTxt/products.txt");
    } else if(databaseType == "mongo"){
        connectMongoDB()
        const {CartsDAOMongo} = await import ("./daos/carts/cartsMongo.js");
        ContenedorDAOCarts = new CartsDAOMongo(cartCollection, cartSchema);
        const {ProductsDAOMongo} = await import ("./daos/products/productsMongo.js");
        ContenedorDAOProductos = new ProductsDAOMongo(productsCollection, productsSchema);
    } else if(databaseType == "firebase"){
        connectFirebase()
        const {CartsDAOFirebase} = await import ("./daos/carts/cartsFirebase.js");
        ContenedorDAOCarts = new CartsDAOFirebase("carrito");
        const {ProductsDAOFirebase} = await import ("./daos/products/productsFirebase.js");
        ContenedorDAOProductos = new ProductsDAOFirebase("productos");
    }
    return {ContenedorDAOProductos, ContenedorDAOCarts};
}