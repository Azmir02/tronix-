import data from '../Data.js'
import Productmodel from '../Models/Productmodel.js'


const loadProducts = async (req,res)=>{
    await Productmodel.deleteMany({})
    const product =  await Productmodel.insertMany(data)
    res.send(product)
}

const getproducts = async (req,res)=>{
    const getproducts = await Productmodel.find()
    res.send(getproducts)
}

const getProductbyId = async (req,res)=>{
    const Productid = await Productmodel.findById(req.params.id)
    res.send(Productid)
   
}

const getProductbySlug = async (req,res)=>{
    const Productslug = await Productmodel.findOne({slug: req.params.slug})
    res.send(Productslug)
}

const getLatestProduct = async (req,res)=>{
  
    const product =  await Productmodel.find().sort({"createdAt": -1}).limit( 3 );
    res.send(product)
}


export {loadProducts,getproducts, getProductbyId,getProductbySlug,getLatestProduct}


