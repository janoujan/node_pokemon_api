const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000


app
    .use(express.json())
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
 
sequelize.initDb()



app.listen(port, () => console.log(`notre application Node est demarré sur hhtp://localhost:${port}`))
