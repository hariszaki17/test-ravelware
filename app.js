require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routers = require('./routers')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routers)

app.listen(PORT, () => console.log(`I love u ${PORT}`))
