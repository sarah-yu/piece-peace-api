const Schema = require('./schema')

const Image = Schema.Image
const Board = Schema.Board
const User = Schema.User

const image_1 = new Image({
	src: 'https://s3.amazonaws.com/piece-peace/serenity-can-dagarslani.jpg',
	origin:
		'https://www.itsnicethat.com/articles/can-dagarslani-photography-050117',
	description: 'Serenity - Can Dagarslani'
})

const image_2 = new Image({
	src:
		'https://s3.amazonaws.com/piece-peace/robert-longo-men-in-the-cities.jpg',
	origin: '',
	description: 'Men in the Cities - Robert Longo'
})

const image_3 = new Image({
	src: 'https://s3.amazonaws.com/piece-peace/rinko-kawauchi-ametsuchi.jpg',
	origin:
		'https://theredlist.com/wiki-2-16-860-897-1112-view-poetic-realism-1-profile-kawauchi-rinko.html',
	description: 'Untitled, from series Ametsuchi - Rinko Kawauchi'
})

const image_4 = new Image({
	src: 'https://s3.amazonaws.com/piece-peace/Love_of_This_Land-7-of-18.jpg',
	origin:
		'https://www.booooooom.com/2017/12/27/photographer-spotlight-alexis-hagestad/',
	description: 'Love of This Land - Alexis Hagestad'
})

const photography_images = [image_1, image_2]
const landscape_images = [image_3, image_4]
const images = [image_1, image_2, image_3, image_4]

const photography = new Board({
	name: 'photography',
	images: photography_images
})

const landscape = new Board({
	name: 'landscape',
	images: landscape_images
})

const boards = [photography, landscape]

const user_1 = new User({
	email: 'user1@gmail.com',
	password: 'password',
	boards: photography
})

const user_2 = new User({
	email: 'user2@gmail.com',
	password: 'password',
	boards: landscape
})

const users = [user_1, user_2]

Image.remove({})
	.catch(err => console.log(err))
	.then(() => {
		console.log('images removed successfully')

		images.forEach(image => {
			image.save((err, image) => {
				err ? console.log('error creating image') : console.log(image)
			})
		})
	})

Board.remove({})
	.catch(err => console.log(err))
	.then(() => {
		console.log('boards removed successfully')

		boards.forEach(board => {
			board.save((err, board) => {
				err ? console.log('error creating board') : console.log(board)
			})
		})
	})

User.remove({})
	.catch(err => console.log(err))
	.then(() => {
		console.log('users removed successfully')

		users.forEach(user => {
			user.save((err, user) => {
				err ? console.log('error creating user') : console.log(user)
			})
		})
	})
