import express from 'express'
import { bannerload,getbanners } from '../Controller/Bannercontroller.js'

const Bannerroute = express.Router()



Bannerroute.route("/loadbanner").get(bannerload)
Bannerroute.route("/").get(getbanners)


export default Bannerroute