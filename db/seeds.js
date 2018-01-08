const Schema = require('./schema')

const Image = Schema.Image
const Board = Schema.Board

const image_1 = new Image({
	src:
		'https://www.itsnicethat.com/system/files/012017/586d34827fa44cea7f007d60/images_slice_large/Can_Dagarslani12.jpg',
	origin:
		'https://www.itsnicethat.com/articles/can-dagarslani-photography-050117',
	description: 'Serenity - Can Dagarslani'
})

const image_2 = new Image({
	src:
		'https://78.media.tumblr.com/45dcff7b03123861ed7a9e6355f1e7ef/tumblr_n2aksa3woh1s00n8bo1_1280.jpg',
	origin: '',
	description: 'Men in the Cities - Robert Longo'
})

const image_3 = new Image({
	src: 'https://s3.amazonaws.com/piece-peace/rinko-kawauchi-ametsuchi.jpg',
	origin:
		'https://theredlist.com/wiki-2-16-860-897-1112-view-poetic-realism-1-profile-kawauchi-rinko.html',
	description: 'Untitled, from series Ametsuchi - Rinko Kawauchi'
})

const photography_images = [image_1, image_2]
const images = [image_1, image_2, image_3]

const photography = new Board({
	name: 'photography',
	images: photography_images
})

const landscape = new Board({
	name: 'landscape',
	images: image_3
})

const boards = [photography, landscape]

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
