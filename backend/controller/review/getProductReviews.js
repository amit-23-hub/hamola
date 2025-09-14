const reviewModel = require('../../models/reviewModel')

const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', rating = 'all' } = req.query
        
        // Build filter
        let filter = { productId, isApproved: true }
        
        if (rating !== 'all') {
            filter.rating = parseInt(rating)
        }
        
        // Build sort
        const sort = {}
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1
        
        const reviews = await reviewModel
            .find(filter)
            .populate('userId', 'name profilePic')
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .lean()
        
        const totalReviews = await reviewModel.countDocuments(filter)
        
        // Calculate rating distribution
        const ratingDistribution = await reviewModel.aggregate([
            { $match: { productId: productId, isApproved: true } },
            { $group: { _id: '$rating', count: { $sum: 1 } } },
            { $sort: { _id: -1 } }
        ])
        
        // Calculate average rating
        const avgRating = await reviewModel.aggregate([
            { $match: { productId: productId, isApproved: true } },
            { $group: { _id: null, average: { $avg: '$rating' }, total: { $sum: 1 } } }
        ])
        
        res.status(200).json({
            success: true,
            data: {
                reviews,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalReviews / limit),
                    totalReviews,
                    hasNext: page < Math.ceil(totalReviews / limit),
                    hasPrev: page > 1
                },
                ratingStats: {
                    average: avgRating[0]?.average || 0,
                    total: avgRating[0]?.total || 0,
                    distribution: ratingDistribution
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getProductReviews
