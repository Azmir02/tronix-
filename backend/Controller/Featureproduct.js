import Featuredmodel from "../Models/Featuredmodel.js";


const getfeaturedproduct = async (req,res)=>{
    let getallfeature = await Featuredmodel.find()
    res.send(getallfeature)
}

export default getfeaturedproduct