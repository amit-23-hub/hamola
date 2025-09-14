const advertisementModel = require('../../models/advertisementModel')

const uploadAdvertisement = async (req, res) => {
    try {
        const { title, description, image, badge, buttonText, link, price, position, isActive, startDate, endDate, priority } = req.body

        const advertisement = new advertisementModel({
            title,
            description,
            image,
            badge,
            buttonText,
            link,
            price,
            position,
            isActive: isActive !== undefined ? isActive : true,
            startDate: startDate ? new Date(startDate) : new Date(),
            endDate: endDate ? new Date(endDate) : null,
            priority: priority || 0
        })

        await advertisement.save()

        res.status(201).json({
            success: true,
            message: 'Advertisement created successfully',
            data: advertisement
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = uploadAdvertisement
