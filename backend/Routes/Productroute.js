import express from 'express'
import getproduct from '../Controller/Getcontroller.js'

const Productroute = express.Router()

Productroute.get('/all',getproduct)


export default Productroute