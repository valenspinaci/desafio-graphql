import mongoose from "mongoose";
import admin from "firebase-admin";
import { options } from "./options.js";

const dbType = options.server.DB_TYPE;

export const connectMongoDB = ()=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(options.mongoDB.dbURL, (err)=>{
        if(err) return (`Hubo un error: ${err}`);
        console.log("Base de datos conectada")
    })
}

export const connectFirebase = ()=>{
    admin.initializeApp(
        {
            credential: admin.credential.cert(options.firebase)
        }
    );
    console.log("Base de datos conectada")
}