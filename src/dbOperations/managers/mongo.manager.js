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
            console.log(error)
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
            let productos = await this.mongoModel.find();
            const result = productos.find(producto => producto._id == productId)
            if(!result){
                throw new Error("El producto no existe")
            }
            return result;
    }

    async getByCategory(prodCategory){
        let productos = await this.mongoModel.find();
        const result = productos.filter(producto => producto.category == prodCategory)
        if(!result){
            throw new Error("No hay productos de esta categoría")
        }
        return result;
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
}

export {ContenedorMongo};