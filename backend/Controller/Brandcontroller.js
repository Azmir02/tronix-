import branddata from "../Brand.js";
import Brands from "../Models/Brandmodel.js";

const Loadnbrand = async (req,res)=>{
    await Brands.deleteMany({})
    const brandData = await Brands.insertMany(branddata)
    res.send(brandData)
}
const getbrand = async (req,res)=>{
    const brandget = await Brands.find()
    res.send(brandget)
}



export {Loadnbrand,getbrand}