import mongoose from "mongoose";

const Schema = mongoose.Schema

const Teammodel = new Schema({
    image:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    designation:{
        type: String,
        required: true,
    }
},
{
    timestamps: true
})

const teammodels = mongoose.model('team',Teammodel)

export default teammodels