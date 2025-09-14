const userModel = require('../../models/userModel')
const orderModel = require('../../models/orderModel')
const productModel = require('../../models/productModel')

const getDashboardStats = async (req, res) => {
    try {
        const { period = '30' } = req.query // days
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - parseInt(period))
        
        // User Statistics
        const totalUsers = await userModel.countDocuments()
        const newUsers = await userModel.countDocuments({
            createdAt: { $gte: startDate }
        })
        const activeUsers = await userModel.countDocuments({
            lastLogin: { $gte: startDate }
        })
        const blockedUsers = await userModel.countDocuments({
            isBlocked: true
        })
        
        // Order Statistics
        const totalOrders = await orderModel.countDocuments()
        const newOrders = await orderModel.countDocuments({
            createdAt: { $gte: startDate }
        })
        const completedOrders = await orderModel.countDocuments({
            status: 'delivered',
            createdAt: { $gte: startDate }
        })
        const pendingOrders = await orderModel.countDocuments({
            status: { $in: ['pending', 'confirmed', 'processing'] }
        })
        
        // Revenue Statistics
        const revenueData = await orderModel.aggregate([
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
        
        const revenue = revenueData[0] || { totalRevenue: 0, averageOrderValue: 0, totalOrders: 0 }
        
        // Product Statistics
        const totalProducts = await productModel.countDocuments()
        const inStockProducts = await productModel.countDocuments({
            inStock: true
        })
        const outOfStockProducts = await productModel.countDocuments({
            inStock: false
        })
        
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
                $limit: 5
            }
        ])
        
        // Daily sales data for chart
        const dailySales = await orderModel.aggregate([
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
        
        // Order status distribution
        const orderStatusDistribution = await orderModel.aggregate([
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
        
        // User registration trend
        const userRegistrationTrend = await userModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
            }
        ])
        
        // Conversion rate calculation
        const conversionData = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: '$userId',
                    orderCount: { $sum: 1 },
                    totalSpent: { $sum: '$pricing.total' }
                }
            }
        ])
        
        const uniqueCustomers = conversionData.length
        const conversionRate = totalUsers > 0 ? (uniqueCustomers / totalUsers) * 100 : 0
        
        res.status(200).json({
            success: true,
            data: {
                overview: {
                    users: {
                        total: totalUsers,
                        new: newUsers,
                        active: activeUsers,
                        blocked: blockedUsers
                    },
                    orders: {
                        total: totalOrders,
                        new: newOrders,
                        completed: completedOrders,
                        pending: pendingOrders
                    },
                    revenue: {
                        total: revenue.totalRevenue,
                        average: revenue.averageOrderValue,
                        orders: revenue.totalOrders
                    },
                    products: {
                        total: totalProducts,
                        inStock: inStockProducts,
                        outOfStock: outOfStockProducts
                    },
                    conversion: {
                        rate: conversionRate,
                        uniqueCustomers: uniqueCustomers
                    }
                },
                charts: {
                    dailySales,
                    orderStatusDistribution: orderStatusDistribution.reduce((acc, item) => {
                        acc[item._id] = item.count
                        return acc
                    }, {}),
                    userRegistrationTrend,
                    topProducts
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

module.exports = getDashboardStats
