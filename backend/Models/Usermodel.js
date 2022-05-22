import mongoose from "mongoose";

const Schema = mongoose.Schema

const user = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    }
})


const  users = mongoose.model('user',user)

export default users