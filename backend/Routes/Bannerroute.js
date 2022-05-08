import express from 'express'
import getbanner from '../Controller/Getbanner.js'

const Bannerroute = express.Router()

Bannerroute.get('/home',getbanner)


export default Bannerroute