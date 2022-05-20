import mongoose from "mongoose";


const Schema = mongoose.Schema

const brandModel = new Schema({
    image:{
        type: String
    }
})
const Brands = mongoose.model('brandmodels',brandModel)

export default Brands