import express from 'express'
import Idcontroller from '../Controller/Idcontroller.js'

const Idroute = express.Router()

Idroute.get('/:id',Idcontroller)

export default Idroute