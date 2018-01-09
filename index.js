const express = require('express')
const mongoose = require('./db/schema')
const parser = require('body-parser')
const cors = require('cors')
const jwt = require('jwt-simple')
const passport = require('passport')
const bcrypt = require('bcrypt')

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

app.post('/receive-images', (req, res) => {
	let urls = req.body.src.split('|')

	let myHTML = '<html><head><title>Photos</title></head><body>'
	for (let i = 0; i < urls.length; i++) {
		myHTML += `<img src='${urls[i]}' />`
	}
	myHTML += '</body></html>'

	// request object has info on who sent the request
	// send response back to whoever sent the request

	// res.send(myHTML)
	res.redirect('http://localhost:3000/receive-images')
})

app.post('/api/sign-in', function(req, res) {
	if (req.body.email && req.body.password) {
		User.findOne({ email: req.body.email })
			.then(user => {
				if (user) {
					// user was found
					console.log(user)
					bcrypt.compare(req.body.password, user.password, (err, response) => {
						if (response) {
							// correct password
							let payload = {
								id: user.id
							}
							let token = jwt.encode(payload, cfg.jwtSecret)
							res.json({ token: token })
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
			.catch(err => console.log(err))
	} else {
		// user did not input both email and password
		res.sendStatus(401)
	}

	if (req.body.email && req.body.password) {
		User.findOne({ email: req.body.email }).then(user => {
			if (user) {
				bcrypt.compare(req.body.password, user.password, function(
					err,
					response
				) {
					if (response) {
						var payload = { id: user.id }
						var token = jwt.encode(payload, cfg.jwtSecret)
						res.json({ token: token })
					} else {
						res.sendStatus(500)
					}
				})
			} else {
				res.sendStatus(500)
			}
		})
	} else {
		res.sendStatus(401)
	}
})

app.post('/api/sign-up', function(req, res) {
	if (req.body.email && req.body.password) {
		User.findOne({ email: req.body.email })
			.then(user => {
				if (user) {
					// user already exists
					res.sendStatus(500)
					console.log('user already exists')
				} else {
					// create a new user
					bcrypt.hash(req.body.password, 8, (err, hash) => {
						User.create({ email: req.body.email, password: hash })
							.then(user => {
								if (user) {
									let payload = { id: user.id }
									let token = jwt.encode(payload, cfg.jwtSecret)
									res.json({ token: token })
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
