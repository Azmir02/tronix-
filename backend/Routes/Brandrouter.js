import  express  from "express";
import { Loadnbrand ,getbrand} from "../Controller/Brandcontroller.js";


const Brandroute = express.Router()

Brandroute.route("/loadbrands").get(Loadnbrand)
Brandroute.route("/").get(getbrand)


export default Brandroute