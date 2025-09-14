const orderModel = require('../../models/orderModel')
const userModel = require('../../models/userModel')

const getAllOrders = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            status = 'all', 
            paymentStatus = 'all',
            search = '',
            sortBy = 'createdAt', 
            sortOrder = 'desc',
            startDate,
            endDate
        } = req.query
        
        // Build filter object
        let filter = {}
        
        if (status !== 'all') {
            filter.status = status
        }
        
        if (paymentStatus !== 'all') {
            filter.paymentStatus = paymentStatus
        }
        
        if (search) {
            filter.$or = [
                { orderNumber: { $regex: search, $options: 'i' } },
                { 'shippingAddress.fullName': { $regex: search, $options: 'i' } },
                { 'shippingAddress.city': { $regex: search, $options: 'i' } }
            ]
        }
        
        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }
        
        // Build sort object
        const sort = {}
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1
        
        const orders = await orderModel
            .find(filter)
            .populate('userId', 'name email phone')
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .lean()
        
        const totalOrders = await orderModel.countDocuments(filter)
        
        // Calculate additional stats for each order
        const ordersWithStats = orders.map(order => ({
            ...order,
            daysSinceOrder: Math.floor((new Date() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24)),
            isOverdue: order.status === 'shipped' && order.shipping.estimatedDelivery && 
                      new Date() > new Date(order.shipping.estimatedDelivery),
            customerName: order.userId?.name || 'Unknown',
            customerEmail: order.userId?.email || 'Unknown'
        }))
        
        res.status(200).json({
            success: true,
            data: {
                orders: ordersWithStats,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalOrders / limit),
                    totalOrders,
                    hasNext: page < Math.ceil(totalOrders / limit),
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

module.exports = getAllOrders
