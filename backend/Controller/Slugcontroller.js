import Productmodel from "../Models/Productmodel.js";


const Slugcontroller = async (req,res)=>{
    const Productslug = await Productmodel.findOne({slug: req.params.slug})
    res.send(Productslug)
}

export default Slugcontroller