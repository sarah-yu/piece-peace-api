const express = require('express')
const mongoose = require('./db/schema')
const parser = require('body-parser')
const cors = require('cors')
const jwt = require('jwt-simple')
const passport = require('passport')
const bcrypt = require('bcrypt')
const formidable = require('formidable')
const fs = require('fs')

const auth = require('./auth')()
const cfg = require('./config.js')
const Schema = require('./db/schema')
const User = Schema.User

const app = express()

const imagesController = require('./controllers/imagesController')
const boardsController = require('./controllers/boardsController')

app.use(cors())
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(auth.initialize())

app.get('/', (req, res) => {
	res.send('nothing to see here')
})

app.get('/api/users', (req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => console.log(err))
})

app.post('/api/login', function(req, res) {
	if (req.body.username && req.body.password) {
		User.findOne({ username: req.body.username }).then(user => {
			if (user) {
				// user was found
				bcrypt.compare(req.body.password, user.password, (err, response) => {
					if (response) {
						// correct password
						let payload = {
							id: user.id
						}

						let token = jwt.encode(payload, cfg.jwtSecret)
						res.json({ token: token, username: req.body.username })
					} else {
						// incorrect password
						console.log('incorrect password')
						res.sendStatus(500)
					}
				})
			} else {
				console.log('user does not exist')
				res.sendStatus(500)
			}
		})
	} else {
		// user did not input both username and password
		res.sendStatus(401)
	}
})

app.post('/api/register', function(req, res) {
	if (req.body.username && req.body.password) {
		User.findOne({ username: req.body.username })
			.then(user => {
				if (user) {
					// user already exists
					console.log('user already exists')
					res.sendStatus(500)
				} else {
					// create a new user
					bcrypt.hash(req.body.password, 8, (err, hash) => {
						User.create({
							username: req.body.username,
							password: hash
						})
							.then(user => {
								if (user) {
									let payload = { id: user.id }
									let token = jwt.encode(payload, cfg.jwtSecret)
									res.json({ token: token, username: req.body.username })
								} else {
									res.sendStatus(401)
								}
							})
							.catch(err => console.log(err))
					})
				}
			})
			.catch(err => console.log(err))
	} else {
		res.sendStatus(401)
	}
})

app.use('/api/images', imagesController)
app.use('/api/boards', boardsController)

app.listen(3001, function() {
	console.log('express server up and running!')
})
