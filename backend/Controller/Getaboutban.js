import aboutbanners from "../Models/Aboutbannermodal.js";


const getaboutban = async(req,res)=>{
    let aboutbans = await aboutbanners.find()
    res.send(aboutbans)
}

export default getaboutban