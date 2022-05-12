import express from 'express'
import getproduct from '../Controller/Getcontroller.js'
import getcupon from '../Controller/Getcupon.js'
import getaboutban from '../Controller/Getaboutban.js'
import getteam from '../Controller/Getteam.js'
import getLatestProduct from '../Controller/getLatestProduct.js'

const Productroute = express.Router()


Productroute.get('/all',getproduct)
Productroute.get('/productlist',getproduct)
Productroute.get('/latestProduct',getLatestProduct)
Productroute.get('/cupon',getcupon)
Productroute.get('/about',getaboutban)
Productroute.get('/team',getteam)


export default Productroute