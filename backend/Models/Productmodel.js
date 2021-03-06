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
    offer:{
        type: Number
    },
    reviews:{
        type: Number,
    },
    showproduct:{
        type: Boolean,
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    button:{
        type: String,
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
},
{
    timestamps: true
})

const Productmodel = mongoose.model('products',Products)

export default Productmodel