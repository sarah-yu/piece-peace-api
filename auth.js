const passport = require('passport')
const passportJWT = require('passport-jwt')
const cfg = require('./config.js')
const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const params = {
	secretOrKey: cfg.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const Schema = require('./db/schema')
const User = Schema.User

module.exports = function() {
	let strategy = new Strategy(params, function(payload, done) {
		// authentication to find user from db
		let user = User.findById(payload.id) || null
		if (user) {
			return done(null, {
				id: user.id
			})
		} else {
			return done(new Error('User not found'), null)
		}
	})

	passport.use(strategy)

	return {
		initialize: function() {
			return passport.initialize()
		},
		authenticate: function() {
			return passport.authenticate('jwt', cfg.jwtSession)
		}
	}
}
