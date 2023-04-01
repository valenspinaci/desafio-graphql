import { admin } from "../server.js";
import { CartsService } from "../services/cart.service.js";

class CartController{
    static async getCart(req,res){
        try {
            const response = await CartsService.getCarts();
            res.status(200).json({
                status:"Success",
                data: response
            })
        } catch (error) {
            res.status(400).json({
                status:"Error",
                message:`Hubo un error: ${error}`
            })
        }
    }

    static async getCartById(req,res){
        try {
            const cartId = req.params.id
            const response = await CartsService.getCartById(cartId);
            res.status(200).json({
                status:"Success",
                data: response
            })
        } catch (error) {
            res.status(400).json({
                status:"Error",
                message:`Hubo un error: ${error}`
            })
        }
    }

    static async uploadCart(req,res){
        try {
            if(admin){
                const products = req.body;
                const response = await CartsService.uploadCart(products);
                res.status(200).json({
                    status:"Success",
                    data:response
                })
            }else{
                res.status(400).json({
                    status:"Error",
                    message:`No tienes permisos`
                })
            }
        } catch (error) {
            res.status(400).json({
                status:"Error",
                message:`Hubo un error: ${error}`
            })
        }
    }

    static async updateCart(req,res){
        const id = req.params.id;
        const body = req.body;
        try {
            if(admin){
                await CartsService.deleteCartById(id);
                body.id = id;
                await CartsService.uploadCart(body);
                res.status(200).json({
                    status:"Success",
                    message:`Producto actualizado`
                })
            }else{
                res.status(400).json({
                    status:"Error",
                    message:`No tienes permisos`
                })
            }
        } catch (error) {
            res.status(400).json({
                status:"Error",
                message:`Hubo un error: ${error}`
            })
        }
    }

    static async deleteCartById(req,res){
        const id = req.params.id;
        try {
            if(admin){
                await CartsService.deleteCartById(id);
                res.status(200).json({
                    status:"Success",
                    message:`Carrito eliminado`
                })
            }else{
                res.status(400).json({
                    status:"Error",
                    message:`No tienes permisos`
                })
            }
        } catch (error) {
            res.status(400).json({
                status:"Error",
                message:`Hubo un error: ${error}`
            })
        }
    }

    static async deleteProdById(req,res){
        const idCart = req.params.idCart;
        const idProd = req.params.idProd;
        try {
            await CartsService.deleteProdById(idCart, idProd);
            res.status(200).json({
                status: "Success",
                message: "Producto eliminado"
            })
        } catch (error) {
            res.status(400).json({
                status:"Error",
                message:`Hubo un error: ${error}`
            })
        }
    }
}

export {CartController}