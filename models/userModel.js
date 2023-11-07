import mongoose, { Schema } from "mongoose";

const userSchema= new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    role:{
        type:Boolean,
        default:false
    }


},{timestamps:true})


export default mongoose.model("users",userSchema);