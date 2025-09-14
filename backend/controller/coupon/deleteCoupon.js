const couponModel = require('../../models/couponModel')

const deleteCoupon = async (req, res) => {
    try {
        const { couponId } = req.params
        
        const coupon = await couponModel.findById(couponId)
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Coupon not found'
            })
        }
        
        // Check if coupon has been used
        if (coupon.usedCount > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete coupon that has been used. Deactivate it instead.'
            })
        }
        
        await couponModel.findByIdAndDelete(couponId)
        
        res.status(200).json({
            success: true,
            message: 'Coupon deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = deleteCoupon
