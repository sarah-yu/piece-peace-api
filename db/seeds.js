const Schema = require('./schema')
const images = require('./seeds.json')

const Image = Schema.Image
const Board = Schema.Board
const User = Schema.User

const photography_images = [
	{
		src: 'https://s3.amazonaws.com/piece-peace/serenity-can-dagarslani.jpg',
		origin:
			'https://www.itsnicethat.com/articles/can-dagarslani-photography-050117',
		description: 'Serenity - Can Dagarslani'
	},
	{
		src:
			'https://s3.amazonaws.com/piece-peace/robert-longo-men-in-the-cities.jpg',
		origin: '',
		description: 'Men in the Cities - Robert Longo'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/rinko-kawauchi-ametsuchi.jpg',
		origin:
			'https://theredlist.com/wiki-2-16-860-897-1112-view-poetic-realism-1-profile-kawauchi-rinko.html',
		description: 'Untitled, from series Ametsuchi - Rinko Kawauchi'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/photo-1.jpg',
		origin: 'https://www.flickr.com/photos/28385655@N06/4424935670/',
		description: 'Flask from the series Jenny World'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/photo-2.jpg',
		origin: 'https://www.vankranendonk.nl/natascha-libbert/',
		description: 'Ladabdi Boy, 2011 by Natascha Libbert'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/photo-3.jpg',
		origin: 'http://www.brunoquinquet.com/',
		description: 'Bruno Quinquet'
	}
]

const cat_images = [
	{
		src: 'https://s3.amazonaws.com/piece-peace/cats-1.jpg',
		origin: 'http://reines.tumblr.com/post/148794616522',
		description: ''
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/cats-2.jpg',
		origin: 'http://vvsundays.tumblr.com/post/143205590065',
		description: 'same'
	}
]

const lol_images = [
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-1.jpg',
		origin: 'http://untrustyou.tumblr.com/',
		description: 'same'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-2.gif',
		origin: 'http://xianzhong.tumblr.com/post/147991114045',
		description: ''
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-batman.jpg',
		origin: '',
		description: 'same'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-egg-offer.png',
		origin: '',
		description: 'same'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-cat.jpg',
		origin: '',
		description: 'same'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-deer.gif',
		origin: '',
		description: 'same'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-dwight.png',
		origin: '',
		description: 'same'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-mayor.jpg',
		origin: '',
		description: 'same'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-raccoon.gif',
		origin: '',
		description: 'same'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-salem.jpg',
		origin: '',
		description: 'same'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-scooby.jpg',
		origin: '',
		description: 'same'
	},
	{
		src: 'https://s3.amazonaws.com/piece-peace/same-you-tried.jpg',
		origin: '',
		description: ''
	}
]

const photography = new Board({
	name: 'photography',
	images: photography_images
})

const cats = new Board({
	name: 'cats',
	images: cat_images
})

const same = new Board({
	name: 'same',
	images: lol_images
})

const boards = [photography, cats, same]

Image.remove({})
	.then(() => {
		console.log('images removed successfully')

		Image.collection.insert(images).then(() => {
			console.log('images created successfully')
		})
	})
	.catch(err => console.log(err))

Board.remove({})
	.catch(err => console.log(err))
	.then(() => {
		console.log('boards removed successfully')

		boards.forEach(board => {
			board.save((err, board) => {
				err
					? console.log('error creating board')
					: console.log('board created successfully')
			})
		})
	})

User.remove({})
