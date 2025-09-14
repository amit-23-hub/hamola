const orderModel = require('../../models/orderModel')

const getOrderStats = async (req, res) => {
    try {
        const { period = '30' } = req.query // days
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - parseInt(period))
        
        // Get order statistics
        const totalOrders = await orderModel.countDocuments({
            createdAt: { $gte: startDate }
        })
        
        const ordersByStatus = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ])
        
        const ordersByPaymentStatus = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: '$paymentStatus',
                    count: { $sum: 1 }
                }
            }
        ])
        
        const revenueStats = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate },
                    paymentStatus: 'paid'
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$pricing.total' },
                    averageOrderValue: { $avg: '$pricing.total' },
                    totalOrders: { $sum: 1 }
                }
            }
        ])
        
        // Daily revenue for the last 30 days
        const dailyRevenue = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate },
                    paymentStatus: 'paid'
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' }
                    },
                    revenue: { $sum: '$pricing.total' },
                    orders: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
            }
        ])
        
        // Top selling products
        const topProducts = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $unwind: '$items'
            },
            {
                $group: {
                    _id: '$items.productId',
                    productName: { $first: '$items.productName' },
                    totalQuantity: { $sum: '$items.quantity' },
                    totalRevenue: { $sum: '$items.totalPrice' }
                }
            },
            {
                $sort: { totalQuantity: -1 }
            },
            {
                $limit: 10
            }
        ])
        
        res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalOrders,
                    revenue: revenueStats[0] || { totalRevenue: 0, averageOrderValue: 0, totalOrders: 0 },
                    ordersByStatus: ordersByStatus.reduce((acc, item) => {
                        acc[item._id] = item.count
                        return acc
                    }, {}),
                    ordersByPaymentStatus: ordersByPaymentStatus.reduce((acc, item) => {
                        acc[item._id] = item.count
                        return acc
                    }, {})
                },
                dailyRevenue,
                topProducts
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getOrderStats
