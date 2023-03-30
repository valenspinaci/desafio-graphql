import mongoose from "mongoose";

class ContenedorMongo{
    constructor(coleccion, esquema){
        this.mongoModel = mongoose.model(coleccion, esquema)
    }

    async save(product){
        try {
            await this.mongoModel.create(product);
            return product;
        } catch (error) {
            console.log("No se pudo guardar el producto")
        }
    }

    async getAll(){
        try {
            let productos = this.mongoModel.find();
            return productos;
        } catch (error) {
            console.log("No se pudieron traer los productos")
        }
    }

    async getById(productId){
        try {
            let productos = await this.mongoModel.find();
            const result = productos.find(producto => producto._id == productId)
            return result;
        } catch (error) {
            console.log("No se pudo traer el producto")
        }
    }

    async deleteById(id){
        try {
            await this.mongoModel.deleteOne({_id:id});
            console.log("Producto eliminado")
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            await this.mongoModel.deleteAll();
            console.log("Productos eliminados")
        } catch (error) {
            console.log("No se pudieron eliminar los productos")
        }
    }

    async update(id){
        try {
            let producto = await this.getById(id);
            await producto.update(req.body);
        } catch (error) {
            console.log("No se pudo actualizar el producto")
        }
    }

    async deleteProdById(idCart, idProd){
        try {
            let cart = await this.getById(idCart);
            let prod = await cart.find(p => p.id === idProd);
            await cart.deleteOne(prod)
        } catch (error) {
            console.log("No se pudo eliminar el producto")
        }
    }
}

export {ContenedorMongo};