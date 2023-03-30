import { ProductsService } from "../services/products.service.js";
import { admin } from "../server.js";

class ProductsController{
    static async getProducts(req,res){
        try {
            const response = await ProductsService.getProducts();
                res.status(200).json({
                    status:"Success",
                    data: response
                })
        } catch (error) {
            res.status(400).json({
                status:"Error",
                message:`El producto no existe`
            })
        }
    }

    static async getProductById(req,res){
        try {
            const productId = req.params.id
            const response = await ProductsService.getProductById(productId);
            res.status(200).json({
                status:"Success",
                data: response
            })
        } catch (error) {
            res.status(400).json({
                status:"Error",
                message:`${error}`
            })
        }
    }

    static async uploadProduct(req,res){
        try {
            if(admin){
                const response = await ProductsService.uploadProduct(req.body);
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

    static async updateProduct(req,res){
        const id = req.params.id;
        const body = req.body;
        try {
            if(admin){
                await ProductsService.deleteProductById(id);
                body.id = id;
                await ProductsService.uploadProduct(body);
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

    static async deleteProductById(req,res){
        const id = req.params.id;
        try {
            if(admin){
                await ProductsService.deleteProductById(id);
                res.status(200).json({
                    status:"Success",
                    message:`Producto eliminado`
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
}

export {ProductsController}