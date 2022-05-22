import express from 'express'
import { loadusers, userloggedin } from '../Controller/Usercontroller.js'



const Userroute = express.Router()


Userroute.route('/loaduser').post(loadusers)
Userroute.route('/').post(userloggedin)



export default Userroute