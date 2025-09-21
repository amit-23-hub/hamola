import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import BannerSection from './BannerSection'
import VerticalCardProduct from './VerticalCardProduct'
import Context from '../context'
import SummaryApi from '../common'
import decorbanner from '../assest/banner/decorbanner.webp'

const HomeDecorSection = () => {
  const { user } = useContext(Context)
  const [decorProducts, setDecorProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDecorProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${SummaryApi.categoryWiseProduct.url}`, {
          method: SummaryApi.categoryWiseProduct.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ category: 'decor' }),
          credentials: 'include'
        })
        const data = await response.json()

        if (data.success) {
          setDecorProducts(data.data)
        }
      } catch (error) {
        console.error('Error fetching decor products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDecorProducts()
  }, [])

  return (
    <section className='py-12 bg-gray-50'>
      <div className='container mx-auto px-4'>
        {/* Banner Section */}
        <div
          className='mb-12 bg-cover bg-center'
          style={{ backgroundImage: `url(${decorbanner})` }}
        >
          <BannerSection
            sectionType="home-decor"
            title="Transform Your Space"
            subtitle="Discover beautiful home decor pieces that reflect your unique style and personality"
            buttonText="Shop Home Decor"
            buttonLink="/product-category?category=decor"
            adminOnly={true}
            user={user}
          />
        </div>


        {/* Featured Decor Products */}
        <div className='mb-8'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Featured Home Decor</h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Curated collection of decorative items to enhance every corner of your home
            </p>
          </div>

          <VerticalCardProduct
            category="decor"
            heading="Trending Decor Items"
          />
        </div>

        {/* Decor Categories Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {[
            { name: 'Wall Art', icon: '🖼️', count: '50+ items', category: 'wall-art' },
            { name: 'Vases', icon: '🏺', count: '30+ items', category: 'vases' },
            { name: 'Candles', icon: '🕯️', count: '25+ items', category: 'candles' },
            { name: 'Mirrors', icon: '🪞', count: '20+ items', category: 'mirrors' }
          ].map((item, index) => (
            <Link
              key={index}
              to={`/product-category?category=${item.category}`}
              className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group'
            >
              <div className='text-4xl mb-3 group-hover:scale-110 transition-transform'>{item.icon}</div>
              <h3 className='text-lg font-semibold text-gray-900 mb-1'>{item.name}</h3>
              <p className='text-sm text-gray-600'>{item.count}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HomeDecorSection
