import {buildSchema} from "graphql";
import {graphqlHTTP} from "express-graphql";
import { rootProducts } from "../services/products.graphql.service.js";

const graphqlSchema = buildSchema(`
    type Product{
        _id: String,
        title: String,
        price: Int,
        thumbnail: String,
        codigo: String,
        stock: Int,
        createdAt: String,
        updatedAt: String
    }

    input ProductInput{
        title: String,
        price: Int,
        thumbnail: String,
        codigo: String,
        stock: Int
    }

    type Query{
        getProducts : [Product],
        getProductById(_id: String) : Product
    }

    type Mutation{
        addProduct(Product: ProductInput): Product,
        deleteProduct(_id: String): String,
        updateProductById(_id:String, Product:ProductInput):Product
    }
`)

export const graphqlController = ()=>{
    return graphqlHTTP({
        schema: graphqlSchema,
        rootValue: rootProducts,
        graphiql: true
    })
}