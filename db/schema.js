const mongoose = require('./connection')
const validators = require('mongoose-validators')

const ImageSchema = new mongoose.Schema({
	src: String,
	// origin: { type: String, lowercase: true, validate: validators.isURL() },
	origin: { type: String, lowercase: true },
	description: { type: String, validate: validators.isLength(0, 140) }
})

const BoardSchema = new mongoose.Schema({
	name: { type: String, required: true, validate: validators.isLength(1, 50) },
	images: [ImageSchema]
})

const Image = mongoose.model('Image', ImageSchema)
const Board = mongoose.model('Board', BoardSchema)

module.exports = {
	Image,
	Board
}
