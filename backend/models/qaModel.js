const mongoose = require('mongoose')

const qaSchema = mongoose.Schema({
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
    question: {
        type: String,
        required: true,
        maxlength: 500
    },
    answer: {
        text: String,
        answeredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        answeredAt: Date
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
    }]
}, {
    timestamps: true
})

const qaModel = mongoose.model("qa", qaSchema)

module.exports = qaModel
