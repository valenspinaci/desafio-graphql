import { ContenedorFirebase } from "../managers/firebase.manager.js"

class ProductsDAOFirebase extends ContenedorFirebase{
    constructor(col){
        super(col)
    }
} 

export {ProductsDAOFirebase}