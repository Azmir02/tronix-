import discount from "../Discount.js";
import Cuponcode from "../Models/Discountmodel.js";


const cupon = async (req,res)=>{
    await Cuponcode.deleteMany({})
    let cupons = await Cuponcode.insertMany(discount)
    res.send(cupons)
}



const getcupon = async(req,res)=>{
    let cuponcodes = await Cuponcode.find()
    if(cuponcodes){
        res.send(cuponcodes)
    }
    else{
        res.status(404).json({msg: "there are no cupon code"})
    }
}

export {cupon, getcupon}