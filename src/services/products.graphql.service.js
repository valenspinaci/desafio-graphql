import {options} from "../config/options.js";
import { getApi } from "../dbOperations/index.js";

const {ContenedorDAOProductos} = await getApi(options.server.DB_TYPE)

export const rootProducts = {
    getProducts: async()=>{
        return await ContenedorDAOProductos.getAll()
    },
    getProductsById:async(id)=>{
        return await ContenedorDAOProductos.getById(id)
    },
    addUser: async(body)=>{
        await ContenedorDAOProductos.save(body)
    }
}