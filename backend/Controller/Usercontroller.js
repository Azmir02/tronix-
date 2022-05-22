import Users from "../Models/Usermodel.js";
import bcrypt from 'bcryptjs'
import { jwttoken } from "../Utils.js";


const loadusers = async(req,res)=>{
    const newUsers = new Users({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        confirmpassword: bcrypt.hashSync(req.body.confirmpassword),
    })

    const newusersdata = await newUsers.save()

    res.send({
        _id: newusersdata._id,
        name: newusersdata.name,
        email: newusersdata.email,
        password: newusersdata.password,
        confirmpassword: newusersdata.confirmpassword,
        token: jwttoken(newusersdata)
    })
}

const userloggedin = async(req,res)=>{
    const userlogged = await Users.findOne({email: req.body.email})
    if(userlogged){
        if(bcrypt.compareSync(req.body.password, userlogged.password)){
            res.send({
                _id: userlogged._id,
                name: userlogged.name,
                email: userlogged.email,
                password: userlogged.password,
                token: jwttoken(userlogged)
            })
            return
        }
    }
    res.status(404).json({msg: "invalid"})
}



export {loadusers,userloggedin}