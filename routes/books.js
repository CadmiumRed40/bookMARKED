const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//@desc /books (All Books route)
router.get('/', async (req, res) => {
   res.send('All Books')
})

//@desc /new (New Books Route)
router.get('/new', (req, res) => {
    res.send('New Books')
})

//@desc / (Create Books Route)
router.post('/', async (req, res) => {
   res.send('Create Book')
})

module.exports = router