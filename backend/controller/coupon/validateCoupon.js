const couponModel = require('../../models/couponModel')
const userModel = require('../../models/userModel')

const validateCoupon = async (req, res) => {
    try {
        const { code, userId, orderAmount, products } = req.body
        
        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Coupon code is required'
            })
        }
        
        const coupon = await couponModel.findOne({ 
            code: code.toUpperCase(),
            isActive: true
        })
        
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Invalid coupon code'
            })
        }
        
        const now = new Date()
        
        // Check if coupon is within valid date range
        if (now < coupon.validFrom || now > coupon.validUntil) {
            return res.status(400).json({
                success: false,
                message: 'Coupon is not valid at this time'
            })
        }
        
        // Check usage limit
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            return res.status(400).json({
                success: false,
                message: 'Coupon usage limit exceeded'
            })
        }
        
        // Check minimum order amount
        if (orderAmount && coupon.minimumAmount > orderAmount) {
            return res.status(400).json({
                success: false,
                message: `Minimum order amount of $${coupon.minimumAmount} required`
            })
        }
        
        // Check user restrictions
        if (userId && coupon.userRestrictions !== 'all') {
            const user = await userModel.findById(userId)
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'User not found'
                })
            }
            
            switch (coupon.userRestrictions) {
                case 'new_users':
                    const userOrderCount = await require('../../models/orderModel').countDocuments({ userId })
                    if (userOrderCount > 0) {
                        return res.status(400).json({
                            success: false,
                            message: 'This coupon is only for new users'
                        })
                    }
                    break
                case 'existing_users':
                    const existingUserOrderCount = await require('../../models/orderModel').countDocuments({ userId })
                    if (existingUserOrderCount === 0) {
                        return res.status(400).json({
                            success: false,
                            message: 'This coupon is only for existing users'
                        })
                    }
                    break
                case 'specific_users':
                    if (!coupon.specificUsers.includes(userId)) {
                        return res.status(400).json({
                            success: false,
                            message: 'This coupon is not available for your account'
                        })
                    }
                    break
            }
        }
        
        // Check product/category restrictions
        if (coupon.applicableTo !== 'all' && products) {
            const productIds = products.map(p => p.productId)
            const productCategories = products.map(p => p.category)
            
            if (coupon.applicableTo === 'product') {
                const hasValidProduct = coupon.products.some(couponProductId => 
                    productIds.some(productId => productId.toString() === couponProductId.toString())
                )
                if (!hasValidProduct) {
                    return res.status(400).json({
                        success: false,
                        message: 'This coupon is not applicable to any products in your cart'
                    })
                }
            } else if (coupon.applicableTo === 'category') {
                const hasValidCategory = coupon.categories.some(couponCategory => 
                    productCategories.includes(couponCategory)
                )
                if (!hasValidCategory) {
                    return res.status(400).json({
                        success: false,
                        message: 'This coupon is not applicable to any categories in your cart'
                    })
                }
            }
        }
        
        // Calculate discount amount
        let discountAmount = 0
        if (orderAmount) {
            if (coupon.type === 'percentage') {
                discountAmount = (orderAmount * coupon.value) / 100
                if (coupon.maximumDiscount && discountAmount > coupon.maximumDiscount) {
                    discountAmount = coupon.maximumDiscount
                }
            } else if (coupon.type === 'fixed') {
                discountAmount = Math.min(coupon.value, orderAmount)
            } else if (coupon.type === 'free_shipping') {
                discountAmount = coupon.value // This would be the shipping cost
            }
        }
        
        res.status(200).json({
            success: true,
            message: 'Coupon is valid',
            data: {
                coupon: {
                    id: coupon._id,
                    code: coupon.code,
                    name: coupon.name,
                    type: coupon.type,
                    value: coupon.value,
                    discountAmount,
                    description: coupon.description
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

module.exports = validateCoupon
