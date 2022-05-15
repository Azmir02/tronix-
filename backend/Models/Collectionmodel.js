import mongoose from "mongoose";

const Schema = mongoose.Schema


const Collection = new Schema({
    image:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    }
}) 


const collectionmodel = mongoose.model('collection',Collection)

export default collectionmodel