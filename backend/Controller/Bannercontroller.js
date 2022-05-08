import Bannerslider from "../Bannerslider.js";
import Bannermodel from "../Models/Bannerslidemodel.js";

const Bannercontoller = async (req,res)=>{
    await Bannermodel.deleteMany({})
    const Banners =  await Bannermodel.insertMany(Bannerslider)
    res.send(Banners)
}

export default Bannercontoller