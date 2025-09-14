const couponModel = require('../../models/couponModel')

const createCoupon = async (req, res) => {
    try {
        const {
            code,
            name,
            description,
            type,
            value,
            minimumAmount,
            maximumDiscount,
            usageLimit,
            validFrom,
            validUntil,
            applicableTo,
            categories,
            products,
            userRestrictions,
            specificUsers
        } = req.body
        
        // Validate required fields
        if (!code || !name || !type || !value || !validFrom || !validUntil) {
            return res.status(400).json({
                success: false,
                message: 'Code, name, type, value, validFrom, and validUntil are required'
            })
        }
        
        // Check if coupon code already exists
        const existingCoupon = await couponModel.findOne({ code: code.toUpperCase() })
        if (existingCoupon) {
            return res.status(400).json({
                success: false,
                message: 'Coupon code already exists'
            })
        }
        
        // Validate dates
        const fromDate = new Date(validFrom)
        const untilDate = new Date(validUntil)
        
        if (untilDate <= fromDate) {
            return res.status(400).json({
                success: false,
                message: 'Valid until date must be after valid from date'
            })
        }
        
        // Validate value based on type
        if (type === 'percentage' && (value < 0 || value > 100)) {
            return res.status(400).json({
                success: false,
                message: 'Percentage value must be between 0 and 100'
            })
        }
        
        if ((type === 'fixed' || type === 'free_shipping') && value < 0) {
            return res.status(400).json({
                success: false,
                message: 'Fixed value must be greater than or equal to 0'
            })
        }
        
        // Create coupon
        const coupon = new couponModel({
            code: code.toUpperCase(),
            name,
            description,
            type,
            value,
            minimumAmount: minimumAmount || 0,
            maximumDiscount,
            usageLimit,
            validFrom: fromDate,
            validUntil: untilDate,
            applicableTo: applicableTo || 'all',
            categories: categories || [],
            products: products || [],
            userRestrictions: userRestrictions || 'all',
            specificUsers: specificUsers || []
        })
        
        await coupon.save()
        
        res.status(201).json({
            success: true,
            message: 'Coupon created successfully',
            data: coupon
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = createCoupon
