import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true
        },
        adress:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true,
            unique:true
        },
        mail:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        photo:{
            type:String,
            required:true
        }
    },
    {
        //Config adicionales
        timestamps:true
    }
)

export const userModel = mongoose.model(userCollection, userSchema);