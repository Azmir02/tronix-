
import Productmodel from '../Models/Productmodel.js'


const getLatestProduct = async (req,res)=>{
  
    const product =  await Productmodel.find().sort({"createdAt": -1}).limit( 3 );
    res.send(product)
}

export default getLatestProduct


