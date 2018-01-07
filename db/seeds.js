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

const images = [image_1, image_2]

const photography = new Board({
	name: 'photography',
	images: images
})

Board.remove({})
	.catch(err => console.log(err))
	.then(() => {
		console.log('boards removed successfully')

		photography.save((err, board) => {
			err ? console.log('error creating board') : console.log(board)
		})
	})
