import Productmodel from "../Models/Productmodel.js";


const Slugcontroller = async (req,res)=>{
    const Productslug = await Productmodel.findOne({slug: req.params.slug})
    if(Productslug){
        res.send(Productslug)
    }
    else{
        res.status(404).json({message: "slug error"})
    }
}

export default Slugcontroller