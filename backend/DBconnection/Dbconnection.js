import mongoose from "mongoose";
import 'dotenv/config'


const connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,()=>{
        console.log('db connected');
    })
}

export default connect