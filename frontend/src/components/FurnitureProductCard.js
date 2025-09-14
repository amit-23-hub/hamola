import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaShoppingCart, FaRuler, FaWeight, FaStar, FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SummaryApi from '../common'
import displayCurrency from '../helpers/displayCurrency'

const FurnitureProductCard = ({ product, addToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const response = await addToCart(product._id, 1)
    if (response.success) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  }

  const handleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const formatDimensions = (dimensions) => {
    if (!dimensions) return 'N/A'
    return `${dimensions.length}" × ${dimensions.width}" × ${dimensions.height}"`
  }

  const getDiscountPercentage = () => {
    if (product.price && product.sellingPrice) {
      return Math.round(((product.price - product.sellingPrice) / product.price) * 100)
    }
    return 0
  }

  const discountPercentage = getDiscountPercentage()

  return (
    <div 
      className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className='relative overflow-hidden'>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.productImage[0] || '/api/placeholder/300/300'}
            alt={product.productName}
            className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
          />
        </Link>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className='absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold'>
            -{discountPercentage}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <FaHeart className='text-sm' />
        </button>

        {/* Quick Actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className='flex gap-2'>
            <Link
              to={`/product/${product._id}`}
              className='bg-white text-gray-700 p-3 rounded-full hover:bg-amber-600 hover:text-white transition-colors'
            >
              <FaEye />
            </Link>
            <button
              onClick={handleAddToCart}
              className='bg-amber-600 text-white p-3 rounded-full hover:bg-amber-700 transition-colors'
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className='p-6'>
        {/* Category & Brand */}
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm text-amber-600 font-medium'>{product.category}</span>
          {product.brandName && (
            <span className='text-sm text-gray-500'>{product.brandName}</span>
          )}
        </div>

        {/* Product Name */}
        <Link to={`/product/${product._id}`}>
          <h3 className='text-lg font-semibold text-gray-900 mb-2 hover:text-amber-600 transition-colors line-clamp-2'>
            {product.productName}
          </h3>
        </Link>

        {/* Room Type */}
        {product.roomType && (
          <div className='flex items-center mb-2'>
            <span className='text-sm text-gray-600'>Perfect for: </span>
            <span className='text-sm font-medium text-amber-600 ml-1 capitalize'>
              {product.roomType.replace('-', ' ')}
            </span>
          </div>
        )}

        {/* Material & Color */}
        <div className='flex items-center gap-4 mb-3 text-sm text-gray-600'>
          {product.material && (
            <span className='flex items-center'>
              <span className='w-2 h-2 bg-amber-400 rounded-full mr-1'></span>
              {product.material}
            </span>
          )}
          {product.color && (
            <span className='flex items-center'>
              <span 
                className='w-3 h-3 rounded-full mr-1 border border-gray-300'
                style={{ backgroundColor: product.color.toLowerCase() }}
              ></span>
              {product.color}
            </span>
          )}
        </div>

        {/* Dimensions */}
        {product.dimensions && (
          <div className='flex items-center text-sm text-gray-600 mb-3'>
            <FaRuler className='mr-2' />
            <span>{formatDimensions(product.dimensions)}</span>
          </div>
        )}

        {/* Weight */}
        {product.weight && (
          <div className='flex items-center text-sm text-gray-600 mb-3'>
            <FaWeight className='mr-2' />
            <span>{product.weight} lbs</span>
          </div>
        )}

        {/* Rating */}
        {product.rating > 0 && (
          <div className='flex items-center mb-3'>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className='text-sm text-gray-600 ml-2'>
              ({product.reviewCount || 0} reviews)
            </span>
          </div>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className='mb-3'>
            <div className='flex flex-wrap gap-1'>
              {product.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full'
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <span className='text-2xl font-bold text-gray-900'>
              {displayCurrency(product.sellingPrice)}
            </span>
            {product.price > product.sellingPrice && (
              <span className='text-lg text-gray-500 line-through'>
                {displayCurrency(product.price)}
              </span>
            )}
          </div>
          {product.inStock ? (
            <span className='text-sm text-green-600 font-medium'>In Stock</span>
          ) : (
            <span className='text-sm text-red-600 font-medium'>Out of Stock</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            product.inStock
              ? 'bg-amber-600 text-white hover:bg-amber-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>

        {/* Assembly Required */}
        {product.assemblyRequired && (
          <div className='mt-2 text-center'>
            <span className='text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full'>
              Assembly Required
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default FurnitureProductCard
