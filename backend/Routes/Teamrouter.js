import express from 'express'
import { getteam, teamLoader } from '../Controller/Teamcontroller.js'



const Teamrouter = express.Router()


Teamrouter.route('/loadteam').get(teamLoader)
Teamrouter.route('/').get(getteam)



export default Teamrouter