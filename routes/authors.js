const express = require('express')
const router = express.Router()

//@desc /authors
router.get('/', (req, res) => {
    res.render('authors/index')
})

//@desc /new
router.get('/new', (req,res) => {
    res.render('authors/new')
})

//@desc / : create author route
router.post('/', (req, res) => {
    res.send('Create')
})

module.exports = router