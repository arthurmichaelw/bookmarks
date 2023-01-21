const { Schema, model } = require('mogoose')

const bookmarkSchema = new Schema({
    title: { type: String, require: true },
    url: { type: String, require: true},
}, {
    timestamps: true
})

module.exports = model('Bookmark', bookmarkSchema)