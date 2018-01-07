const express = require('express')
const Schema = require('../db/schema')

const router = express.Router()

const Image = Schema.Image

router.get('/', (req, res) => {
	Image.find()
		.then(images => res.json(images))
		.catch(err => console.log(err))
})

module.exports = router
