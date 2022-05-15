import aboutbanner from "../Aboutbanner.js";
import aboutbanners from "../Models/Aboutbannermodal.js";


const aboutban = async(req,res)=>{
   await aboutbanners.deleteMany({})
   let aboutpic = await aboutbanners.insertMany(aboutbanner)
   res.send(aboutpic)
}

const getaboutban = async(req,res)=>{
   let aboutbans = await aboutbanners.find()
   res.send(aboutbans)
}

export {aboutban,getaboutban}