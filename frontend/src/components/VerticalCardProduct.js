import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }


  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-gray-900'>{heading}</h2>
        <Link 
          to={`/product-category?category=${category}`}
          className='text-red-600 hover:text-red-700 font-medium flex items-center gap-2 transition-colors'
        >
          View All
          <FaAngleRight className='text-sm' />
        </Link>
      </div>

      <div className='relative'>
        <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
          <button className='bg-white shadow-lg rounded-full p-3 absolute left-0 text-lg hidden md:block z-10 hover:shadow-xl transition-shadow' onClick={scrollLeft}>
            <FaAngleLeft />
          </button>
          <button className='bg-white shadow-lg rounded-full p-3 absolute right-0 text-lg hidden md:block z-10 hover:shadow-xl transition-shadow' onClick={scrollRight}>
            <FaAngleRight />
          </button>

          {loading ? (
            loadingList.slice(0, 4).map((product, index) => (
              <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0'>
                <div className='bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse'>
                </div>
                <div className='p-4 grid gap-3'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                  <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                  <div className='flex gap-3'>
                    <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                  </div>
                  <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                </div>
              </div>
            ))
          ) : (
            data.slice(0, 4).map((product, index) => (
              <Link 
                key={product._id} 
                to={"product/" + product?._id} 
                className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group flex-shrink-0'
              >
                <div className='bg-slate-100 h-48 p-4 flex justify-center items-center relative overflow-hidden'>
                  <img 
                    src={product.productImage[0]} 
                    className='object-scale-down h-full group-hover:scale-110 transition-all duration-300 mix-blend-multiply' 
                    alt={product.productName}
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300'></div>
                </div>
                <div className='p-4 grid gap-3'>
                  <h2 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-gray-900 group-hover:text-red-600 transition-colors'>
                    {product?.productName}
                  </h2>
                  <p className='capitalize text-slate-500 text-sm'>{product?.category}</p>
                  <div className='flex gap-3 items-center'>
                    <p className='text-red-600 font-bold text-lg'>{displayINRCurrency(product?.sellingPrice)}</p>
                    {product?.price > product?.sellingPrice && (
                      <p className='text-slate-500 line-through text-sm'>{displayINRCurrency(product?.price)}</p>
                    )}
                  </div>
                  <button 
                    className='text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors font-medium' 
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default VerticalCardProduct