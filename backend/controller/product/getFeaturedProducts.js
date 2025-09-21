const Product = require('../../models/productModel')

const getFeaturedProducts = async (req, res) => {
    try {
        const { category, limit = 4 } = req.query

        let query = { isActive: true }
        
        if (category) {
            query.category = category
        }

        const products = await Product.find(query)
            .select('productName productImage sellingPrice price category _id')
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            message: "Featured products fetched successfully",
            data: products
        })

    } catch (error) {
        console.error('Error fetching featured products:', error)
        res.status(500).json({
            success: false,
            message: "Error fetching featured products",
            error: error.message
        })
    }
}

module.exports = getFeaturedProducts
