const express = require('express')
const Schema = require('../db/schema')

const router = express.Router()

const Board = Schema.Board
const Image = Schema.Image

// getBoards
router.get('/', (req, res) => {
	Board.find()
		.sort({ date: -1 })
		.then(boards => res.json(boards))
		.catch(err => console.log(err))
})

// getBoard
router.get('/:id', (req, res) => {
	Board.findById(req.params.id)
		.then(board => res.json(board))
		.catch(err => console.log(err))
})

// createBoard
router.post('/', (req, res) => {
	Board.create(req.body)
		.then(board => {
			res.json(board)
		})
		.catch(err => console.log(err))
})

// updateBoard
router.put('/:id', (req, res) => {
	console.log('**********')
	console.log(req.body)
	console.log('**********')

	Board.findById(req.params.id)
		.then(board => {
			board.set(req.body)

			board
				.save()
				.then(board => {
					console.log(board)
					res.json(board)
				})
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
})

// deleteBoard
router.delete('/:id', (req, res) => {
	Board.findByIdAndRemove(req.params.id)
		.then(board => res.json(board))
		.catch(err => console.log(err))
})

// getBoardImage
router.get('/:board_id/images/:image_id', (req, res) => {
	Board.findById(req.params.board_id)
		.then(board => {
			let image = board.images.id(req.params.image_id)
			res.json(image)
		})
		.catch(err => console.log(err))
})

// pinImageToBoard
router.post('/:id', (req, res) => {
	console.log(req.body)

	Board.findById(req.params.id)
		.then(board => {
			board.images.push(req.body)
			board
				.save()
				.then(board => {
					console.log(board)
					res.json(board)
				})
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
})

// removeImageFromBoard
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

// put route for board images
router.put('/:board_id/images/:image_id', (req, res) => {
	Board.findById(req.params.board_id)
		.then(board => {
			let image = board.images.id(req.params.image_id)

			image.set(req.body)

			board
				.save()
				.then(board => res.json(board))
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
})

module.exports = router
