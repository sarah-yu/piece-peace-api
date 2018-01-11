const express = require('express')
const Schema = require('../db/schema')

const router = express.Router()

const Image = Schema.Image

// getImages
router.get('/', (req, res) => {
	Image.find()
		// .sort({ date: -1 })
		.then(images => res.json(images))
		.catch(err => console.log(err))
})

// getImage
router.get('/:id', (req, res) => {
	Image.findById(req.params.id)
		.then(image => res.json(image))
		.catch(err => console.log(err))
})

// createImage
router.post('/', (req, res) => {
	console.log('CREATE IMAGE')
	console.log(req.body)

	Image.create(req.body)
		.then(image => res.json(image))
		.catch(err => console.log(err))
})

module.exports = router
