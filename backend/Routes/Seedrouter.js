import express from "express";
import Productcontoller from '../Controller/Productcontroller.js'
import Bannercontoller from "../Controller/Bannercontroller.js";
import Cupon from "../Controller/Discountcontroller.js";
import teamcontroller from "../Controller/Teamcontroller.js";
import aboutban from "../Controller/Aboutcontroller.js";


const seedrouter = express.Router()


seedrouter.get('/',Bannercontoller)
seedrouter.get('/products',Productcontoller)
seedrouter.get('/cartpage',Cupon)
seedrouter.get('/about',aboutban)
seedrouter.get('/team',teamcontroller)


export default seedrouter