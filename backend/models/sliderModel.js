const mongoose = require('mongoose')

const sliderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        default: 'Learn More'
    },
    buttonLink: {
        type: String,
        default: '#'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const sliderModel = mongoose.model("slider", sliderSchema)

module.exports = sliderModel
