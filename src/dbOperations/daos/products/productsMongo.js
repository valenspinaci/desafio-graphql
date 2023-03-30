import { ContenedorMongo } from "../../managers/mongo.manager.js"

class ProductsDAOMongo extends ContenedorMongo{
    constructor(col, schema){
        super(col, schema)
    }
} 

export {ProductsDAOMongo}