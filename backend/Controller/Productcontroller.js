import data from '../Data.js'
import Productmodel from '../Models/Productmodel.js'


const Productcontoller = async (req,res)=>{
    await Productmodel.deleteMany({})
    const product =  await Productmodel.insertMany(data)
    res.send(product)
}

export default Productcontoller


