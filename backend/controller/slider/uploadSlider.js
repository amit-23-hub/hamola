const sliderModel = require('../../models/sliderModel')

const uploadSlider = async (req, res) => {
    try {
        const { title, subtitle, image, buttonText, buttonLink, isActive, order } = req.body

        const slider = new sliderModel({
            title,
            subtitle,
            image,
            buttonText,
            buttonLink,
            isActive: isActive !== undefined ? isActive : true,
            order: order || 0
        })

        await slider.save()

        res.status(201).json({
            success: true,
            message: 'Slider created successfully',
            data: slider
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = uploadSlider
