const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')

//@desc /books (All Books route)
router.get('/', async (req, res) => {
   res.send('All Books')
})

//@desc /new (New Books Route)
router.get('/new', async (req, res) => {
    try {
      const authors = await Author.find({})
      const book = new Book()
      res.render('books/new', {
         authors: authors,
         book: book
      })
    } catch (error) {
      res.redirect('/books')
    }
})

//@desc / (Create Books Route)
router.post('/', async (req, res) => {
   res.send('Create Book')
})

module.exports = router