import React, { useState, useEffect, useContext } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import HeroSlider from '../components/HeroSlider'
import AdvertisementCard from '../components/AdvertisementCard'
import OffersSection from '../components/OffersSection'
import { Link } from 'react-router-dom'
import SummaryApi from '../common'
import Context from '../context'



const Home = () => {
  const { user } = useContext(Context)
  const [advertisements, setAdvertisements] = useState([])
  const [sliderData, setSliderData] = useState([])

  useEffect(() => {
    // Fetch slider data from backend
    const fetchSliders = async () => {
      try {
        const response = await fetch(SummaryApi.getSliders.url, {
          method: SummaryApi.getSliders.method,
          credentials: 'include'
        })
        const data = await response.json()
        if (data.success) {
          setSliderData(data.data)
        }
      } catch (error) {
        console.error('Error fetching sliders:', error)
        // Fallback data
        setSliderData([
          {
            image: '/api/placeholder/1200/500',
            title: 'Premium Furniture Collection',
            subtitle: 'Transform your space with our handcrafted pieces',
            buttonText: 'Shop Now'
          }
        ])
      }
    }

    // Fetch advertisements from backend
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(`${SummaryApi.getAdvertisements.url}?position=homepage`, {
          method: SummaryApi.getAdvertisements.method,
          credentials: 'include'
        })
        const data = await response.json()
        if (data.success) {
          setAdvertisements(data.data)
        }
      } catch (error) {
        console.error('Error fetching advertisements:', error)
        // Fallback data
        setAdvertisements([
          {
            id: 1,
            title: 'Free Assembly',
            description: 'Professional assembly service included',
            image: '/api/placeholder/300/200',
            badge: 'Free',
            buttonText: 'Learn More',
            link: '/services'
          }
        ])
      }
    }

    fetchSliders()
    fetchAdvertisements()
  }, [])

  return (
    <div>
      {/* Hero Slider */}
      <section className='mb-8'>
        <div className='container mx-auto px-4'>
          <div className='grid lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2'>
              <HeroSlider slides={sliderData} />
            </div>
            <div className='space-y-3'>
              {advertisements.map(ad => (
                <AdvertisementCard 
                  key={ad.id} 
                  advertisement={ad} 
                  isAdmin={user?.role === 'admin'}
                  onEdit={(ad) => {
                    // Handle edit advertisement
                    console.log('Edit advertisement:', ad)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className='py-8'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-bold text-center text-gray-900 mb-6'>
            Shop by Category
          </h2>
          <CategoryList/>
        </div>
      </section>

      {/* Offers & Coupons Section */}
      <OffersSection/>

      {/* Featured Products Banner */}
      <section className='py-8 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <BannerProduct/>
        </div>
      </section>

      {/* Room Inspiration Section */}
      <section className='py-8'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-bold text-center text-gray-900 mb-6'>
            Room Inspiration
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[
              { room: 'Living Room', icon: '🛋️', count: '120+ items' },
              { room: 'Bedroom', icon: '🛏️', count: '95+ items' },
              { room: 'Dining Room', icon: '🍽️', count: '80+ items' },
              { room: 'Office', icon: '💼', count: '60+ items' }
            ].map((item, index) => (
              <Link 
                key={index}
                to={`/room/${item.room.toLowerCase().replace(' ', '-')}`}
                className='bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow text-center group'
              >
                <div className='text-3xl mb-3 group-hover:scale-110 transition-transform'>{item.icon}</div>
                <h3 className='text-lg font-semibold text-gray-900 mb-1'>{item.room}</h3>
                <p className='text-sm text-gray-600'>{item.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className='py-8 bg-red-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-bold text-center text-gray-900 mb-6'>
            Featured Collections
          </h2>
          
          <HorizontalCardProduct category={"sofas"} heading={"Best Selling Sofas"}/>
          <HorizontalCardProduct category={"chairs"} heading={"Premium Chairs"}/>
          <HorizontalCardProduct category={"tables"} heading={"Dining Tables"}/>
          <HorizontalCardProduct category={"beds"} heading={"Comfortable Beds"}/>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className='py-8'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-bold text-center text-gray-900 mb-6'>
            Explore Our Collections
          </h2>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <VerticalCardProduct category={"storage"} heading={"Storage Solutions"}/>
            <VerticalCardProduct category={"dining"} heading={"Dining Collection"}/>
            <VerticalCardProduct category={"office"} heading={"Office Furniture"}/>
            <VerticalCardProduct category={"outdoor"} heading={"Outdoor Living"}/>
            <VerticalCardProduct category={"lighting"} heading={"Lighting"}/>
            <VerticalCardProduct category={"decor"} heading={"Home Decor"}/>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='py-8 bg-gray-900 text-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-bold text-center mb-6'>
            Why Choose FurniCraft?
          </h2>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className='text-center'>
              <div className='text-4xl mb-3'>🚚</div>
              <h3 className='text-lg font-semibold mb-2'>Free Delivery</h3>
              <p className='text-sm text-gray-300'>Free shipping on orders over $500</p>
            </div>
            <div className='text-center'>
              <div className='text-4xl mb-3'>🛠️</div>
              <h3 className='text-lg font-semibold mb-2'>Assembly Service</h3>
              <p className='text-sm text-gray-300'>Professional assembly included</p>
            </div>
            <div className='text-center'>
              <div className='text-4xl mb-3'>💎</div>
              <h3 className='text-lg font-semibold mb-2'>Premium Quality</h3>
              <p className='text-sm text-gray-300'>Handcrafted with finest materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='py-8 bg-red-600'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-2xl font-bold text-white mb-2'>
            Stay Updated
          </h2>
          <p className='text-red-100 mb-4'>
            Get exclusive access to new arrivals and offers.
          </p>
          <div className='max-w-md mx-auto flex gap-2'>
            <input 
              type='email' 
              placeholder='Enter your email' 
              className='flex-1 px-4 py-2 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-red-300'
            />
            <button className='px-4 py-2 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors'>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home