const reviewModel = require('../../models/reviewModel')
const productModel = require('../../models/productModel')

const createReview = async (req, res) => {
    try {
        const { productId, rating, title, comment, images } = req.body
        const userId = req.user.id

        // Check if user already reviewed this product
        const existingReview = await reviewModel.findOne({ productId, userId })
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this product'
            })
        }

        // Validate product exists
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        // Create review
        const review = new reviewModel({
            productId,
            userId,
            rating,
            title,
            comment,
            images: images || []
        })

        await review.save()

        // Update product rating
        await updateProductRating(productId)

        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            data: review
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateProductRating = async (productId) => {
    try {
        const reviews = await reviewModel.find({ productId, isApproved: true })
        
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
            const averageRating = totalRating / reviews.length
            
            await productModel.findByIdAndUpdate(productId, {
                rating: averageRating,
                reviewCount: reviews.length
            })
        }
    } catch (error) {
        console.error('Error updating product rating:', error)
    }
}

module.exports = createReview
