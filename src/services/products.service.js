import { getApi } from "../dbOperations/index.js";
import {options} from "../config/options.js"

const {ContenedorDAOProductos} = await getApi(options.server.DB_TYPE)

class ProductsService{
    //Traer productos
    static async getProducts(){
        const products = await ContenedorDAOProductos.getAll();
        return products;
    }
    //Traer producto por id
    static async getProductById(productId){
        const product = await ContenedorDAOProductos.getById(productId);
        return product;
    }
    //Subir un nuevo producto. Solo disponible para admin
    static async uploadProduct(body){
        return await ContenedorDAOProductos.save(body)
    }
    //Actualizar producto. Solo disponible para admin
    static async updateProduct(body, id){
        return await ContenedorDAOProductos.update(body, id)
    }
    //Borrar producto por id. Solo disponible para admin
    static async deleteProductById(id){
        await ContenedorDAOProductos.deleteById(id)
    }
}

export {ProductsService};