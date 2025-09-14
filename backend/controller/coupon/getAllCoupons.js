const couponModel = require('../../models/couponModel')

const getAllCoupons = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            status = 'all', 
            type = 'all',
            search = '',
            sortBy = 'createdAt', 
            sortOrder = 'desc'
        } = req.query
        
        // Build filter object
        let filter = {}
        
        if (status === 'active') {
            filter.isActive = true
            filter.validFrom = { $lte: new Date() }
            filter.validUntil = { $gte: new Date() }
        } else if (status === 'expired') {
            filter.validUntil = { $lt: new Date() }
        } else if (status === 'inactive') {
            filter.isActive = false
        } else if (status === 'upcoming') {
            filter.validFrom = { $gt: new Date() }
        }
        
        if (type !== 'all') {
            filter.type = type
        }
        
        if (search) {
            filter.$or = [
                { code: { $regex: search, $options: 'i' } },
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        }
        
        // Build sort object
        const sort = {}
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1
        
        const coupons = await couponModel
            .find(filter)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .lean()
        
        const totalCoupons = await couponModel.countDocuments(filter)
        
        // Calculate additional stats for each coupon
        const couponsWithStats = coupons.map(coupon => {
            const now = new Date()
            const isExpired = coupon.validUntil < now
            const isUpcoming = coupon.validFrom > now
            const isActive = coupon.isActive && !isExpired && !isUpcoming
            const usagePercentage = coupon.usageLimit ? 
                (coupon.usedCount / coupon.usageLimit) * 100 : 
                null
            const remainingUses = coupon.usageLimit ? 
                Math.max(0, coupon.usageLimit - coupon.usedCount) : 
                null
            
            return {
                ...coupon,
                isExpired,
                isUpcoming,
                isActive,
                usagePercentage,
                remainingUses
            }
        })
        
        res.status(200).json({
            success: true,
            data: {
                coupons: couponsWithStats,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalCoupons / limit),
                    totalCoupons,
                    hasNext: page < Math.ceil(totalCoupons / limit),
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

module.exports = getAllCoupons
