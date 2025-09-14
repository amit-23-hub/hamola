const userModel = require('../../models/userModel')

const getAllUsersDetailed = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', status = 'all', sortBy = 'createdAt', sortOrder = 'desc' } = req.query
        
        // Build filter object
        let filter = {}
        
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ]
        }
        
        if (status === 'active') {
            filter.isActive = true
            filter.isBlocked = false
        } else if (status === 'blocked') {
            filter.isBlocked = true
        } else if (status === 'inactive') {
            filter.isActive = false
        }
        
        // Build sort object
        const sort = {}
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1
        
        const users = await userModel
            .find(filter)
            .select('-password') // Exclude password from response
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .lean()
        
        const totalUsers = await userModel.countDocuments(filter)
        
        // Calculate additional stats for each user
        const usersWithStats = users.map(user => ({
            ...user,
            daysSinceLastLogin: user.lastLogin ? 
                Math.floor((new Date() - new Date(user.lastLogin)) / (1000 * 60 * 60 * 24)) : 
                null,
            isRecentlyActive: user.lastLogin ? 
                (new Date() - new Date(user.lastLogin)) < (7 * 24 * 60 * 60 * 1000) : 
                false
        }))
        
        res.status(200).json({
            success: true,
            data: {
                users: usersWithStats,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalUsers / limit),
                    totalUsers,
                    hasNext: page < Math.ceil(totalUsers / limit),
                    hasPrev: page > 1
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getAllUsersDetailed
