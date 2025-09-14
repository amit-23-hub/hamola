const userModel = require('../../models/userModel')

const updateUserStatus = async (req, res) => {
    try {
        const { userId, action, reason } = req.body
        
        if (!userId || !action) {
            return res.status(400).json({
                success: false,
                message: 'User ID and action are required'
            })
        }
        
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        
        let updateData = {}
        let message = ''
        
        switch (action) {
            case 'block':
                updateData = { isBlocked: true, isActive: false }
                message = 'User blocked successfully'
                break
            case 'unblock':
                updateData = { isBlocked: false, isActive: true }
                message = 'User unblocked successfully'
                break
            case 'activate':
                updateData = { isActive: true, isBlocked: false }
                message = 'User activated successfully'
                break
            case 'deactivate':
                updateData = { isActive: false }
                message = 'User deactivated successfully'
                break
            case 'reset':
                // Reset user stats and preferences
                updateData = {
                    stats: {
                        totalOrders: 0,
                        totalSpent: 0,
                        lastOrderDate: null
                    },
                    lastLogin: null
                }
                message = 'User account reset successfully'
                break
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid action'
                })
        }
        
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-password')
        
        res.status(200).json({
            success: true,
            message,
            data: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = updateUserStatus
