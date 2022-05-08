import Cuponcode from "../Models/Discountmodel.js";


const getcupon = async(req,res)=>{
    let cuponcodes = await Cuponcode.find()
    if(cuponcodes){
        res.send(cuponcodes)
    }
    else{
        res.status(404).json({msg: "there are no cupon code"})
    }
}

export default getcupon