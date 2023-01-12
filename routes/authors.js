const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//@desc /authors (All Author route)
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//@desc /new (New Author Route)
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

//@desc / (Create Author Route)
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect(`authors/${newAuthor.id}`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

router.get('/:id', (req,res) => {
    res.send('Show Author' + req.params.id)
})

router.get('/:id/edit', async (req,res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author })
    } catch {
        res.redirect('/authors')
    }
})

router.put('/:id', async (req,res) => {
   let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch {
        if(author == null) {
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating Author'
        })
        }
    }
})

//Not using GET because once a web index crawls over your page it clicks on all of your GET links and will end up deleting all of your information.
//This is why we are using 'methodOverride' and 'DELETE' instead. This also means we cannot use simple anchor tags in our views. 
router.delete('/:id', (req,res) => {
    res.send('Delete Author' + req.params.id)
})

module.exports = router