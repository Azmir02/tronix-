import express from "express";
import Productcontoller from '../Controller/Productcontroller.js'


const seedrouter = express.Router()


seedrouter.get('/products',Productcontoller)


export default seedrouter