import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Aboutmodal = new Schema({
    image:{
        type: String,
        require: true
    }
})

const aboutbanners = mongoose.model('aboutbanner',Aboutmodal)

export default aboutbanners
