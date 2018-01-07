const express = require('express')
// const mongoose = require('./db/schema')
const parser = require('body-parser')
const cors = require('cors')

// const Schema = require('./db/schema')
// const Photo = Schema.Photo

const app = express()

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(cors())

app.get('/', (req, res) => {
	res.send('hello world')
})

app.listen(3001, function() {
	console.log('express server up and running!')
})
