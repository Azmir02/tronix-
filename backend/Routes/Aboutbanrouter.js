import express from 'express'
import { aboutban, getaboutban } from '../Controller/Aboutcontroller.js'

const Aboutbannerroute = express.Router()



Aboutbannerroute.route("/loadaboutbanner").get(aboutban)
Aboutbannerroute.route("/").get(getaboutban)



export default Aboutbannerroute