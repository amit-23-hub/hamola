import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const CollectionCard = ({ category, heading, icon }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category)
      setData(categoryProduct?.data?.slice(0, 3) || []) // Show only 3 products
    } catch (error) {
      console.error('Error fetching products:', error)
      setData([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [category])

  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
      {/* Header */}
      <div className='p-6 border-b border-gray-100'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='text-3xl'>{icon}</div>
            <h3 className='text-lg font-semibold text-gray-900'>{heading}</h3>
          </div>
          <Link 
            to={`/product-category?category=${category}`}
            className='text-red-600 hover:text-red-700 text-sm font-medium transition-colors'
          >
            View All →
          </Link>
        </div>
      </div>

      {/* Products */}
      <div className='p-4'>
        {loading ? (
          <div className='space-y-4'>
            {[1, 2, 3].map((item) => (
              <div key={item} className='flex space-x-3 animate-pulse'>
                <div className='w-16 h-16 bg-gray-200 rounded'></div>
                <div className='flex-1 space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                  <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                  <div className='h-4 bg-gray-200 rounded w-1/3'></div>
                </div>
              </div>
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className='space-y-4'>
            {data.map((product, index) => (
              <Link 
                key={product._id} 
                to={`/product/${product._id}`}
                className='flex space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors'
              >
                <div className='w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0'>
                  <img 
                    src={product.productImage[0]} 
                    alt={product.productName}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform'
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <h4 className='text-sm font-medium text-gray-900 truncate group-hover:text-red-600 transition-colors'>
                    {product.productName}
                  </h4>
                  <p className='text-xs text-gray-500 capitalize'>{product.category}</p>
                  <div className='flex items-center space-x-2 mt-1'>
                    <span className='text-sm font-semibold text-red-600'>
                      {displayINRCurrency(product.sellingPrice)}
                    </span>
                    {product.price > product.sellingPrice && (
                      <span className='text-xs text-gray-500 line-through'>
                        {displayINRCurrency(product.price)}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={(e) => handleAddToCart(e, product._id)}
                  className='opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded transition-all duration-200'
                >
                  Add
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <div className='text-center py-8 text-gray-500'>
            <div className='text-4xl mb-2'>{icon}</div>
            <p className='text-sm'>No products available</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='px-4 pb-4'>
        <Link 
          to={`/product-category?category=${category}`}
          className='block w-full text-center bg-gray-100 hover:bg-red-600 hover:text-white text-gray-700 py-2 rounded-lg transition-colors duration-200 text-sm font-medium'
        >
          View All Products
        </Link>
      </div>
    </div>
  )
}

export default CollectionCard
