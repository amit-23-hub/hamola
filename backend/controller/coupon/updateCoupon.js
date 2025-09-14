const couponModel = require('../../models/couponModel')

const updateCoupon = async (req, res) => {
    try {
        const { couponId } = req.params
        const updateData = req.body
        
        const coupon = await couponModel.findById(couponId)
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Coupon not found'
            })
        }
        
        // If code is being updated, check for uniqueness
        if (updateData.code && updateData.code !== coupon.code) {
            const existingCoupon = await couponModel.findOne({ 
                code: updateData.code.toUpperCase(),
                _id: { $ne: couponId }
            })
            if (existingCoupon) {
                return res.status(400).json({
                    success: false,
                    message: 'Coupon code already exists'
                })
            }
            updateData.code = updateData.code.toUpperCase()
        }
        
        // Validate dates if being updated
        if (updateData.validFrom || updateData.validUntil) {
            const fromDate = updateData.validFrom ? new Date(updateData.validFrom) : coupon.validFrom
            const untilDate = updateData.validUntil ? new Date(updateData.validUntil) : coupon.validUntil
            
            if (untilDate <= fromDate) {
                return res.status(400).json({
                    success: false,
                    message: 'Valid until date must be after valid from date'
                })
            }
        }
        
        // Validate value if being updated
        if (updateData.type || updateData.value !== undefined) {
            const type = updateData.type || coupon.type
            const value = updateData.value !== undefined ? updateData.value : coupon.value
            
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
        }
        
        const updatedCoupon = await couponModel.findByIdAndUpdate(
            couponId,
            updateData,
            { new: true, runValidators: true }
        )
        
        res.status(200).json({
            success: true,
            message: 'Coupon updated successfully',
            data: updatedCoupon
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = updateCoupon
