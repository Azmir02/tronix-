import express from 'express'
import { cupon, getcupon } from '../Controller/Discountcontroller.js'



const Discount = express.Router()



Discount.route("/loaddiscount").get(cupon)
Discount.route("/").get(getcupon)


export default Discount