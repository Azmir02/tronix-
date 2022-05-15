import teammodels from "../Models/Teammodel.js";
import Team from "../Team.js";


const teamLoader = async(req,res)=>{
    await teammodels.deleteMany({})
    let teamparts = await teammodels.insertMany(Team)
    res.send(teamparts)
}
const getteam = async (req,res)=>{
    let teamall = await teammodels.find()
    res.send(teamall)
}



export {teamLoader, getteam}