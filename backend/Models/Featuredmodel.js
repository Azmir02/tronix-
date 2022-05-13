import mongoose from "mongoose";

const Schema = mongoose.Schema

const Featured = new Schema({
    image:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    left:{
        type: String
    },
    right:{
        type: String
    },
    bottom:{
        type: String
    }
})


const Featuredmodel = mongoose.model('featured',Featured)

export default Featuredmodel