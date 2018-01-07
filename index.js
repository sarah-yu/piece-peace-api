const express = require('express')
const mongoose = require('./db/schema')
const parser = require('body-parser')
const cors = require('cors')

const app = express()

const imagesController = require('./controllers/imagesController')
const boardsController = require('./controllers/boardsController')

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(cors())

app.get('/', (req, res) => {
	res.send('nothing to see here')
})

app.use('/api/images', imagesController)
app.use('/api/boards', boardsController)

app.listen(3001, function() {
	console.log('express server up and running!')
})
