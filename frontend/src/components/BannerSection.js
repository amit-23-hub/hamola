import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SummaryApi from '../common'

const BannerSection = ({ sectionType, title, subtitle, buttonText, buttonLink, adminOnly = false, user }) => {
  const [bannerData, setBannerData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${SummaryApi.getAdvertisements.url}?position=${sectionType}`, {
          method: SummaryApi.getAdvertisements.method,
          credentials: 'include'
        })
        const data = await response.json()
        
        if (data.success && data.data.length > 0) {
          setBannerData(data.data[0])
        } else {
          // Fallback data
          setBannerData({
            image: '/api/placeholder/1200/400',
            title: title,
            subtitle: subtitle,
            buttonText: buttonText,
            link: buttonLink
          })
        }
      } catch (error) {
        console.error('Error fetching banner data:', error)
        // Fallback data
        setBannerData({
          image: '/api/placeholder/1200/400',
          title: title,
          subtitle: subtitle,
          buttonText: buttonText,
          link: buttonLink
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBannerData()
  }, [sectionType, title, subtitle, buttonText, buttonLink])

  if (loading) {
    return (
      <div className='relative h-96 bg-gray-200 animate-pulse rounded-lg overflow-hidden'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='h-8 w-64 bg-gray-300 rounded mb-4'></div>
            <div className='h-4 w-48 bg-gray-300 rounded mb-6'></div>
            <div className='h-10 w-32 bg-gray-300 rounded'></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='relative h-96 rounded-lg overflow-hidden group'>
      <div 
        className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105'
        style={{ backgroundImage: `url(${bannerData?.image})` }}
      >
        <div className='absolute inset-0 bg-black bg-opacity-40'></div>
      </div>
      
      <div className='relative z-10 h-full flex items-center justify-center'>
        <div className='text-center text-white px-6 max-w-2xl'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg'>
            {bannerData?.title || title}
          </h2>
          <p className='text-lg md:text-xl mb-8 drop-shadow-md'>
            {bannerData?.subtitle || subtitle}
          </p>
          <Link 
            to={bannerData?.link || buttonLink}
            className='inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl'
          >
            {bannerData?.buttonText || buttonText}
          </Link>
        </div>
      </div>

      {adminOnly && user?.role === 'admin' && (
        <div className='absolute top-4 right-4 z-20'>
          <button className='bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-all'>
            Edit Banner
          </button>
        </div>
      )}
    </div>
  )
}

export default BannerSection
