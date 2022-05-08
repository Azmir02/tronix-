import teammodels from "../Models/Teammodel.js";
import Team from "../Team.js";


const teamcontroller = async(req,res)=>{
    await teammodels.deleteMany({})
    let teamparts = await teammodels.insertMany(Team)
    res.send(teamparts)
}


export default teamcontroller