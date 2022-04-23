import mongoose from "mongoose";

const Schema = mongoose.Schema

const Products = new Schema({
    image:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,

    },
    price:{
        type: Number,
        required: true
    },
    slug:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: false,
    },
    inStock:{
        type: Number,
        required: false,
    },
    reviews:{
        type: Number,
    },
    description:{
        type: String,
        required: true
    },
    button:{
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const Productmodel = mongoose.model('products',Products)

export default Productmodel