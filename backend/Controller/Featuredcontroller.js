import featured from "../Featured.js";
import Featuredmodel from "../Models/Featuredmodel.js";


const Featuredcontoller = async (req,res)=>{
    await Featuredmodel.deleteMany({})
    let featureproducts = await Featuredmodel.insertMany(featured)
    res.send(featureproducts)
}

export default Featuredcontoller