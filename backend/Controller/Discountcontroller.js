import discount from "../Discount.js";
import Cuponcode from "../Models/Discountmodel.js";


const Cupon = async (req,res)=>{
    await Cuponcode.deleteMany({})
    let cupons = await Cuponcode.insertMany(discount)
    res.send(cupons)
}

export default Cupon