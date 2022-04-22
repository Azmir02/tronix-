import express from 'express'
import dbconnect from './DBconnection/Dbconnection.js'
import seedrouter from './Routes/Seedrouter.js'
import Productroute from './Routes/Productroute.js'
import Slugroute from './Routes/Slugroute.js'
import Idroute from './Routes/Idroute.js'


//db connect
dbconnect()

const app = express()
//middleware
app.use(express.json())

//main router
app.use('/api',seedrouter)
//get-data
app.use('/api/products',Productroute)
//slig-data
app.use('/api/products',Slugroute)
//Product-id
app.use('/api/productid',Idroute)






const Port = process.env.PORT || 8000

app.listen(Port)