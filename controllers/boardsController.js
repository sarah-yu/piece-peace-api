const express = require('express')
const Schema = require('../db/schema')

const router = express.Router()

const Board = Schema.Board
const Image = Schema.Image

router.get('/', (req, res) => {
	Board.find()
		.then(boards => res.json(boards))
		.catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
	Board.findById(req.params.id)
		.then(board => res.json(board))
		.catch(err => console.log(err))
})

router.post('/', (req, res) => {
	Board.create(req.body.board)
		.then(board => res.json(board))
		.catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
	Board.findByIdAndUpdate(req.params.id, req.body)
		.then(board => res.json(board))
		.catch(err => console.log(err))
})

// delete route for boards
router.delete('/:id', (req, res) => {
	Board.findByIdAndRemove(req.params.id)
		.then(board => res.json(board))
		.catch(err => console.log(err))
})

// delete route for board images
router.delete('/:board_id/images/:image_id', (req, res) => {
	Board.findById(req.params.board_id)
		.then(board => {
			let imageIndex = board.images.findIndex(image => {
				return image._id == req.params.image_id
			})
			board.images.splice(imageIndex, 1)
			board
				.save()
				.then(board => res.json(board))
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
})

module.exports = router
