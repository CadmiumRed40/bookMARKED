//@desc Ensuring we open the app in developement mode
if(process.env.NODE_ENV !=='production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs') 
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//@desc Connecting to database.
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser:true,
    /*useUnifiedTopology:true,
    family: 4,*/
    })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//@desc Routers
app.use('/', indexRouter)

//@desc Listening Port
app.listen(process.env.PORT || 3000)