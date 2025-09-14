const orderModel = require('../../models/orderModel')

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status, note, trackingNumber, carrier, estimatedDelivery } = req.body
        const adminId = req.user.id // From auth middleware
        
        if (!orderId || !status) {
            return res.status(400).json({
                success: false,
                message: 'Order ID and status are required'
            })
        }
        
        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }
        
        const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned']
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            })
        }
        
        const updateData = { status }
        const timelineEntry = {
            status,
            timestamp: new Date(),
            note: note || `Status changed to ${status}`,
            updatedBy: adminId
        }
        
        // Add specific fields based on status
        switch (status) {
            case 'shipped':
                if (trackingNumber) updateData['shipping.trackingNumber'] = trackingNumber
                if (carrier) updateData['shipping.carrier'] = carrier
                if (estimatedDelivery) updateData['shipping.estimatedDelivery'] = new Date(estimatedDelivery)
                updateData['shipping.shippedAt'] = new Date()
                break
            case 'delivered':
                updateData['shipping.deliveredAt'] = new Date()
                break
            case 'cancelled':
                updateData.paymentStatus = 'refunded'
                break
        }
        
        // Add timeline entry
        updateData.$push = { timeline: timelineEntry }
        
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            updateData,
            { new: true }
        ).populate('userId', 'name email')
        
        res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            data: updatedOrder
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = updateOrderStatus
