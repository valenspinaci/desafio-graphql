import mongoose from "mongoose";
import admin from "firebase-admin";
import { options } from "./options.js";

const dbType = options.server.DB_TYPE;

export const connectMongoDB = async()=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(options.mongoDB.dbURL, (err)=>{
        if(err) return (`Hubo un error: ${err}`);
    })
}

export const connectFirebase = async ()=>{
    admin.initializeApp(
        {
            credential: admin.credential.cert(options.firebase)
        }
    );
}