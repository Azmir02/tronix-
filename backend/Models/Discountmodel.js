import mongoose from "mongoose";

const Schema = mongoose.Schema

const Discount = new Schema({
    cupon:{
        type: String
    },
    discount:{
        type: String
    }
})


const Cuponcode = mongoose.model('discount',Discount)

export default Cuponcode