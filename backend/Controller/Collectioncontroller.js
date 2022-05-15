import collectionmodel from "../Models/Collectionmodel.js";
import collections from "../Collection.js";



const loadCollection = async (req,res)=>{
    await collectionmodel.deleteMany({})
    let collectionproduct = await collectionmodel.insertMany(collections)
    res.send(collectionproduct)
}
const collectionget = async (req,res)=>{
    let collectionproducts = await collectionmodel.find()
    res.send(collectionproducts)
}


export {loadCollection,collectionget}