const express = require('express')
require('dotenv').config()
const cors = require('cors')
require ("./config/cnx-db")
const app = express()
const router = require('./routes/routes');
const fileUpload = require('express-fileupload')
/* const router = require('./routes/routes') */


const port = process.env.PORT
const host = process.env.HOST || '0.0.0.0'

app.use('/uploads', express.static(`${__dirname}/uploads`))
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use("/api", router)



app.listen(port, host, ( ) => console.log("Listening on PORT "  + port))