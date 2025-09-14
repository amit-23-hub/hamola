const mongoose = require('mongoose')

const viewedProductSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    viewedAt: {
        type: Date,
        default: Date.now
    },
    sessionId: String, // For non-logged in users
    ipAddress: String
}, {
    timestamps: true
})

// Index for efficient queries
viewedProductSchema.index({ userId: 1, viewedAt: -1 })
viewedProductSchema.index({ sessionId: 1, viewedAt: -1 })

const viewedProductModel = mongoose.model("viewedProduct", viewedProductSchema)

module.exports = viewedProductModel
