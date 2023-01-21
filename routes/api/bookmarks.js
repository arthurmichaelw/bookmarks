const router = require('express').Router()
const checkToken = require('../../config/checkToken')
const bookmarkCtrl = require('../../controllers/api/bookmarks')
const ensureLoggedIn = require('../../config/ensureLoggedIn')


// DELETE
router.delete('/:id', checkToken, ensureLoggedIn, bookmarkCtrl.destroyBookmark, bookmarkCtrl.respondWithBookmark)

// PUT
router.put('/:id', checkToken, ensureLoggedIn,  bookmarkCtrl.updateBookmark, bookmarkCtrl.respondWithBookmark)

// POST
router.post('/', checkToken, ensureLoggedIn, bookmarkCtrl.createBookmark, bookmarkCtrl.respondWithBookmark)