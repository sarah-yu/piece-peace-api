const mongoose = require('./connection')
const validators = require('mongoose-validators')

const ImageSchema = new mongoose.Schema({
	src: String,
	// origin: { type: String, lowercase: true, validate: validators.isURL() },
	origin: { type: String, lowercase: true },
	description: { type: String, validate: validators.isLength(0, 140) },
	date: { type: Date, default: Date.now }
})

const BoardSchema = new mongoose.Schema({
	name: { type: String, required: true, validate: validators.isLength(1, 50) },
	date: { type: Date, default: Date.now },
	images: [ImageSchema]
})

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true, validate: validators.isEmail() },
	password: { type: String, required: true },
	boards: [BoardSchema]
})

const Image = mongoose.model('Image', ImageSchema)
const Board = mongoose.model('Board', BoardSchema)
const User = mongoose.model('User', UserSchema)

module.exports = {
	Image,
	Board,
	User
}
