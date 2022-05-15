import express from 'express'

import { getLatestProduct, getProductbyId, getProductbySlug, getproducts, loadProducts } from '../Controller/Productcontroller.js'


const Productroute = express.Router()



Productroute.route("/").get(getproducts)
Productroute.route("/loadproducts").get(loadProducts)
Productroute.route("/latestProduct").get(getLatestProduct)
Productroute.route("/:slug").get(getProductbySlug)
Productroute.route("/:id").get(getProductbyId)



export default Productroute