const orderModel = require('../../models/orderModel')

const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params
        
        const order = await orderModel
            .findById(orderId)
            .populate('userId', 'name email phone')
            .populate('items.productId', 'productName productImage price')
            .lean()
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }
        
        // Calculate additional order statistics
        const orderStats = {
            ...order,
            daysSinceOrder: Math.floor((new Date() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24)),
            isOverdue: order.status === 'shipped' && order.shipping.estimatedDelivery && 
                      new Date() > new Date(order.shipping.estimatedDelivery),
            estimatedDeliveryDays: order.shipping.estimatedDelivery ? 
                Math.ceil((new Date(order.shipping.estimatedDelivery) - new Date()) / (1000 * 60 * 60 * 24)) : 
                null,
            totalItems: order.items.reduce((sum, item) => sum + item.quantity, 0)
        }
        
        res.status(200).json({
            success: true,
            data: orderStats
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getOrderDetails
