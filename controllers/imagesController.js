const express = require('express')
const Schema = require('../db/schema')

const router = express.Router()

const Image = Schema.Image

router.get('/', (req, res) => {
	Image.find()
		.then(images => res.json(images))
		.catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
	Image.findById(req.params.id)
		.then(image => res.json(image))
		.catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
	Image.findByIdAndRemove(req.params.id)
		.then(image => res.json(image))
		.catch(err => console.log(err))
})

module.exports = router
