const sliderModel = require('../../models/sliderModel')

const getSliders = async (req, res) => {
    try {
        const sliders = await sliderModel
            .find({ isActive: true })
            .sort({ order: 1, createdAt: -1 })

        res.status(200).json({
            success: true,
            data: sliders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getSliders
