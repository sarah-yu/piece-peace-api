const express = require('express')
const Schema = require('../db/schema')

const router = express.Router()

const Board = Schema.Board

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
	Board.create(req.body)
		.then(board => res.json(board))
		.catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
	Board.findByIdAndUpdate(req.params.id, req.body)
		.then(board => res.json(board))
		.catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
	Board.findByIdAndRemove(req.params.id)
		.then(board => res.json(board))
		.catch(err => console.log(err))
})

module.exports = router
