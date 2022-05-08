import teammodels from "../Models/Teammodel.js";


const getteam = async (req,res)=>{
    let teamall = await teammodels.find()
    res.send(teamall)
}


export default getteam