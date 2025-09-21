import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import BannerSection from './BannerSection'
import VerticalCardProduct from './VerticalCardProduct'
import Context from '../context'
import SummaryApi from '../common'
import furnish from '../assest/banner/furnish.webp'

const HomeFurnishingSection = () => {
  const { user } = useContext(Context)
  const [furnishingProducts, setFurnishingProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFurnishingProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${SummaryApi.categoryWiseProduct.url}`, {
          method: SummaryApi.categoryWiseProduct.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ category: 'furnishing' }),
          credentials: 'include'
        })
        const data = await response.json()
        
        if (data.success) {
          setFurnishingProducts(data.data)
        }
      } catch (error) {
        console.error('Error fetching furnishing products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFurnishingProducts()
  }, [])

  return (
    <section className='py-12 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Banner Section */}
        <div
                  className='mb-12 bg-cover bg-center'
                  style={{ backgroundImage: `url(${furnish})` }}
                >
          <BannerSection
            sectionType="home-furnishing"
            title="Complete Your Home"
            subtitle="Essential furnishing items to create a comfortable and stylish living space"
            buttonText="Shop Furnishing"
            buttonLink="/product-category?category=furnishing"
            adminOnly={true}
            user={user}
          />
        </div>

        {/* Featured Furnishing Products */}
        <div className='mb-8'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Essential Furnishing</h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Complete your home with our carefully selected furnishing essentials
            </p>
          </div>
          
          <VerticalCardProduct 
            category="furnishing" 
            heading="Must-Have Furnishing"
          />
        </div>

        {/* Furnishing Categories Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {[
            { name: 'Curtains', icon: '🪟', count: '40+ items', category: 'curtains' },
            { name: 'Cushions', icon: '🛋️', count: '60+ items', category: 'cushions' },
            { name: 'Rugs', icon: '🪞', count: '35+ items', category: 'rugs' },
            { name: 'Bedding', icon: '🛏️', count: '45+ items', category: 'bedding' }
          ].map((item, index) => (
            <Link 
              key={index}
              to={`/product-category?category=${item.category}`}
              className='bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group'
            >
              <div className='text-4xl mb-3 group-hover:scale-110 transition-transform'>{item.icon}</div>
              <h3 className='text-lg font-semibold text-gray-900 mb-1'>{item.name}</h3>
              <p className='text-sm text-gray-600'>{item.count}</p>
            </Link>
          ))}
        </div>

        {/* Room-by-Room Guide */}
        <div className='bg-gray-50 rounded-lg p-8'>
          <div className='text-center mb-8'>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>Room-by-Room Guide</h3>
            <p className='text-gray-600'>Complete furnishing solutions for every room</p>
          </div>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              { 
                room: 'Living Room', 
                icon: '🛋️', 
                items: ['Sofas', 'Coffee Tables', 'TV Stands', 'Curtains'],
                link: '/room/living-room'
              },
              { 
                room: 'Bedroom', 
                icon: '🛏️', 
                items: ['Beds', 'Wardrobes', 'Bedding', 'Nightstands'],
                link: '/room/bedroom'
              },
              { 
                room: 'Dining Room', 
                icon: '🍽️', 
                items: ['Dining Tables', 'Chairs', 'Sideboards', 'Lighting'],
                link: '/room/dining-room'
              },
              { 
                room: 'Office', 
                icon: '💼', 
                items: ['Desks', 'Chairs', 'Storage', 'Accessories'],
                link: '/room/office'
              }
            ].map((room, index) => (
              <Link 
                key={index}
                to={room.link}
                className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group'
              >
                <div className='text-center mb-4'>
                  <div className='text-3xl mb-2 group-hover:scale-110 transition-transform'>{room.icon}</div>
                  <h4 className='font-semibold text-gray-900 mb-2'>{room.room}</h4>
                </div>
                <ul className='space-y-1 text-sm text-gray-600'>
                  {room.items.map((item, itemIndex) => (
                    <li key={itemIndex} className='flex items-center'>
                      <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2'></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>

        {/* Quality Promise */}
        <div className='mt-12 bg-red-50 rounded-lg p-8'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>Our Quality Promise</h3>
            <div className='grid md:grid-cols-3 gap-6'>
              <div className='text-center'>
                <div className='text-3xl mb-2'>✨</div>
                <h4 className='font-semibold text-gray-900 mb-2'>Premium Materials</h4>
                <p className='text-sm text-gray-600'>Only the finest materials for lasting comfort</p>
              </div>
              <div className='text-center'>
                <div className='text-3xl mb-2'>🔧</div>
                <h4 className='font-semibold text-gray-900 mb-2'>Easy Assembly</h4>
                <p className='text-sm text-gray-600'>Simple setup with detailed instructions</p>
              </div>
              <div className='text-center'>
                <div className='text-3xl mb-2'>💎</div>
                <h4 className='font-semibold text-gray-900 mb-2'>Designer Quality</h4>
                <p className='text-sm text-gray-600'>Curated by interior design experts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFurnishingSection
