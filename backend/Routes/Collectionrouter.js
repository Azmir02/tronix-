import express from 'express'
import { collectionget, loadCollection } from '../Controller/Collectioncontroller.js'



const Collectionroute = express.Router()


Collectionroute.route('/loadcollection').get(loadCollection)
Collectionroute.route('/').get(collectionget)


export default Collectionroute