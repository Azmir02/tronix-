import Productmodel from "../Models/Productmodel.js";


const getproduct = async (req,res)=>{
    const getproducts = await Productmodel.find()
    res.send(getproducts)
}

export default getproduct