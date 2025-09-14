const userModel = require('../../models/userModel')

const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params
        
        const user = await userModel.findById(userId).select('-password')
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        
        // Calculate additional user statistics
        const userStats = {
            ...user.toObject(),
            daysSinceLastLogin: user.lastLogin ? 
                Math.floor((new Date() - new Date(user.lastLogin)) / (1000 * 60 * 60 * 24)) : 
                null,
            isRecentlyActive: user.lastLogin ? 
                (new Date() - new Date(user.lastLogin)) < (7 * 24 * 60 * 60 * 1000) : 
                false,
            accountAge: Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)),
            averageOrderValue: user.stats.totalOrders > 0 ? 
                user.stats.totalSpent / user.stats.totalOrders : 
                0
        }
        
        res.status(200).json({
            success: true,
            data: userStats
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getUserDetails
