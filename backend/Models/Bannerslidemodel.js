import mongoose from "mongoose";

const Schema = mongoose.Schema


const Bannerslidermodel = new Schema({
    image:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    para:{
        type: String,
        required: true
    }
})

const Bannermodel = mongoose.model('bannersliders',Bannerslidermodel)

export default Bannermodel