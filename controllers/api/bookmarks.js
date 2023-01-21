const Bookmark = require('../../models/bookmark')
require('dotenv').config()


//delete bookmark
const destroyBookmark = async (req, res, next) => {
    try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id)
        res.locals.data.bookmark = deletedBookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}

//update bookmark
const updateBookmark = async (req, res, next) => {
    try {
        const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.bookmark = updatedBookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}

//create bookmark
const createBookmark = async (req, res, next) => {
    try {
        const createdBookmark = await Bookmark.create(req.body)
        res.locals.data.bookmark = createdBookmark
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const respondWithBookmark = (req, res) => {
    res.json(res.locals.data.bookmark)
}

module.exports = {
    destroyBookmark,
    updateBookmark,
    createBookmark,
    respondWithBookmark
}