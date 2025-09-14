const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    comment: {
        type: String,
        required: true,
        maxlength: 1000
    },
    images: [{
        type: String // URLs to review images
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: true
    },
    helpful: {
        type: Number,
        default: 0
    },
    notHelpful: {
        type: Number,
        default: 0
    },
    helpfulUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    notHelpfulUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    response: {
        text: String,
        respondedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        respondedAt: Date
    }
}, {
    timestamps: true
})

// Ensure one review per user per product
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true })

const reviewModel = mongoose.model("review", reviewSchema)

module.exports = reviewModel
