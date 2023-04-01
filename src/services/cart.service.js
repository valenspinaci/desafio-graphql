import { getApi } from "../dbOperations/index.js";
import {options} from "../config/options.js"

const {ContenedorDAOCarts} = await getApi(options.server.DB_TYPE)

class CartsService{
    //Traer carritos
    static async getCarts(){
        const carts = await ContenedorDAOCarts.getAll();
        return carts;
    }
    //Traer carrito por id
    static async getCartById(cartId){
        const cart = await ContenedorDAOCarts.getById(cartId);
        return cart;
    }
    //Subir un nuevo carrito. Solo disponible para admin
    static async uploadCart(body){
        return await ContenedorDAOCarts.save(body)
    }
    //Actualizar carrito. Solo disponible para admin
    static async updateCart(body, id){
        return await ContenedorDAOCarts.update(body, id)
    }
    //Borrar carrito por id. Solo disponible para admin
    static async deleteCartById(id){
        await ContenedorDAOCarts.deleteById(id)
    }
}

export {CartsService};