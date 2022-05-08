import Bannermodel from "../Models/Bannerslidemodel.js"


const getbanner = async(req,res)=>{
    const banners = await Bannermodel.find()
    res.send(banners)
}

export default getbanner