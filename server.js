//@desc Ensuring we open the app in developement mode
if(process.env.NODE_ENV !=='production') {
    require('dotenv').config(); //!!!!!!!!
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

//const dotenv = require('dotenv').config({ path:'./env'}) //!!!!!!

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs') 
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit:'10mb', extended: false} ))

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
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

//@desc Listening Port
app.listen(process.env.PORT || 3000)