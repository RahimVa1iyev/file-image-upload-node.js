const { StatusCodes } = require('http-status-codes')
const path = require('path')
const { BadRequestError } = require('../errors')

const uploadProductImage = async (req, res) => {

    if (!req.files) {
        throw new BadRequestError('Uploads image file')
    }

    let productImage = req.files.image
    
    if (!productImage.mimetype.startsWith('image')) {
        throw new BadRequestError('Uploads image file')
    }

    const size = 1024 * 1024

    if (productImage.size > 1000) {
        throw new BadRequestError(`Image file smaller than ${size}`)
    }


    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)

    await productImage.mv(imagePath)
    res.status(StatusCodes.CREATED).json({ image: { src: `/uploads/${productImage.name}` } })

}


module.exports = { uploadProductImage }

