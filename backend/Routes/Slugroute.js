import express from 'express'
import Slugcontroller from '../Controller/Slugcontroller.js'

const Slugroute = express.Router()

Slugroute.get('/:slug',Slugcontroller)


export default Slugroute