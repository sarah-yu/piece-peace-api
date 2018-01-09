const express = require('express')
const Schema = require('../db/schema')

const router = express.Router()

const Image = Schema.Image

router.get('/', (req, res) => {
	Image.find()
		.sort({ date: -1 })
		.then(images => res.json(images))
		.catch(err => console.log(err))
})

// get route for an original image, not altered version from any board
router.get('/:id', (req, res) => {
	Image.findById(req.params.id)
		.then(image => res.json(image))
		.catch(err => console.log(err))
})

module.exports = router
