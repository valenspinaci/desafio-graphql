import {ContenedorMongo} from "../../managers/mongo.manager.js"

class CartsDAOMongo extends ContenedorMongo{
    constructor(col, schema){
        super(col, schema)
    }
} 

export {CartsDAOMongo}