const userModel = require('../../models/userModel')

const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params
        const { name, email, phone, addresses, preferences } = req.body
        
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        
        // Check if email is being changed and if it's already taken
        if (email && email !== user.email) {
            const existingUser = await userModel.findOne({ email })
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                })
            }
        }
        
        const updateData = {}
        
        if (name) updateData.name = name
        if (email) updateData.email = email
        if (phone) updateData.phone = phone
        if (addresses) updateData.addresses = addresses
        if (preferences) updateData.preferences = { ...user.preferences, ...preferences }
        
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-password')
        
        res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
            data: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = updateUserProfile
