import express from 'express'
import dbconnect from './DBconnection/Dbconnection.js'
import Aboutbannerroute from './Routes/Aboutbanrouter.js'
import Bannerroute from './Routes/Bannerroute.js'
import Collectionroute from './Routes/Collectionrouter.js'
import Discount from './Routes/Discountrouter.js'
import Productroute from './Routes/Productroute.js'
import Teamrouter from './Routes/Teamrouter.js'



//db connect
dbconnect()

const app = express()
//middleware
app.use(express.json())


//main router
app.use("/api/products",Productroute)
app.use("/api/banner",Bannerroute)
app.use("/api/aboutbanner",Aboutbannerroute)
app.use("/api/teams",Teamrouter)
app.use("/api/discount",Discount)
app.use("/api/collection",Collectionroute)




const Port = process.env.PORT || 8000

app.listen(Port)