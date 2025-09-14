const mongoose = require('mongoose')

const advertisementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    badge: {
        type: String,
        default: ''
    },
    buttonText: {
        type: String,
        default: 'Learn More'
    },
    link: {
        type: String,
        default: '#'
    },
    price: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        enum: ['homepage', 'sidebar', 'banner', 'footer'],
        default: 'homepage'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    priority: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const advertisementModel = mongoose.model("advertisement", advertisementSchema)

module.exports = advertisementModel
