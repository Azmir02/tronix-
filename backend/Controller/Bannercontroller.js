import Bannerslider from "../Bannerslider.js";
import Bannermodel from "../Models/Bannerslidemodel.js";

const bannerload = async (req,res)=>{
    await Bannermodel.deleteMany({})
    const Banners =  await Bannermodel.insertMany(Bannerslider)
    res.send(Banners)
}

const getbanners = async(req,res)=>{
    const banners = await Bannermodel.find()
    res.send(banners)
}
export {bannerload,getbanners}