import Productmodel from "../Models/Productmodel.js";

const Idcontroller = async (req,res)=>{
    const Productid = await Productmodel.findById(req.params.id)
    res.send(Productid)
   
}

export default Idcontroller