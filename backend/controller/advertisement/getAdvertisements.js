const advertisementModel = require('../../models/advertisementModel')

const getAdvertisements = async (req, res) => {
    try {
        const { position = 'homepage' } = req.query
        
        const advertisements = await advertisementModel
            .find({ 
                isActive: true,
                position: position,
                $or: [
                    { endDate: { $exists: false } },
                    { endDate: null },
                    { endDate: { $gte: new Date() } }
                ]
            })
            .sort({ priority: -1, createdAt: -1 })
            .limit(5)

        res.status(200).json({
            success: true,
            data: advertisements
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getAdvertisements
