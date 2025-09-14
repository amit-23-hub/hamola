import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import SummaryApi from '../common'
import CloudinaryUpload from './CloudinaryUpload'
import { useCloudinary } from '../hooks/useCloudinary'

const AdminAdvertisementManager = () => {
  const [advertisements, setAdvertisements] = useState([])
  const [sliders, setSliders] = useState([])
  const [showAdvertisementForm, setShowAdvertisementForm] = useState(false)
  const [showSliderForm, setShowSliderForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    badge: '',
    buttonText: 'Learn More',
    link: '#',
    price: '',
    position: 'homepage',
    isActive: true,
    priority: 0
  })

  useEffect(() => {
    fetchAdvertisements()
    fetchSliders()
  }, [])

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch(SummaryApi.getAdvertisements.url, {
        method: SummaryApi.getAdvertisements.method,
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setAdvertisements(data.data)
      }
    } catch (error) {
      console.error('Error fetching advertisements:', error)
    }
  }

  const fetchSliders = async () => {
    try {
      const response = await fetch(SummaryApi.getSliders.url, {
        method: SummaryApi.getSliders.method,
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setSliders(data.data)
      }
    } catch (error) {
      console.error('Error fetching sliders:', error)
    }
  }

  const handleSubmitAdvertisement = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(SummaryApi.uploadAdvertisement.url, {
        method: SummaryApi.uploadAdvertisement.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Advertisement created successfully')
        setShowAdvertisementForm(false)
        setFormData({
          title: '',
          description: '',
          image: '',
          badge: '',
          buttonText: 'Learn More',
          link: '#',
          price: '',
          position: 'homepage',
          isActive: true,
          priority: 0
        })
        fetchAdvertisements()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error creating advertisement')
    }
  }

  const handleSubmitSlider = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(SummaryApi.uploadSlider.url, {
        method: SummaryApi.uploadSlider.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Slider created successfully')
        setShowSliderForm(false)
        setFormData({
          title: '',
          subtitle: '',
          image: '',
          buttonText: 'Learn More',
          buttonLink: '#',
          isActive: true,
          order: 0
        })
        fetchSliders()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error creating slider')
    }
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>Content Management</h2>
      
      {/* Advertisement Management */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-semibold'>Advertisements</h3>
          <button
            onClick={() => setShowAdvertisementForm(true)}
            className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
          >
            Add Advertisement
          </button>
        </div>
        
        {showAdvertisementForm && (
          <form onSubmit={handleSubmitAdvertisement} className='mb-6 p-4 border rounded-lg'>
            <h4 className='text-lg font-semibold mb-4'>Create Advertisement</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <input
                type='text'
                placeholder='Title'
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className='p-2 border rounded-lg'
                required
              />
              <input
                type='text'
                placeholder='Description'
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className='p-2 border rounded-lg'
                required
              />
              <input
                type='url'
                placeholder='Image URL'
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className='p-2 border rounded-lg'
                required
              />
              <input
                type='text'
                placeholder='Badge (optional)'
                value={formData.badge}
                onChange={(e) => setFormData({...formData, badge: e.target.value})}
                className='p-2 border rounded-lg'
              />
              <input
                type='text'
                placeholder='Button Text'
                value={formData.buttonText}
                onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                className='p-2 border rounded-lg'
              />
              <input
                type='url'
                placeholder='Link'
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                className='p-2 border rounded-lg'
              />
              <select
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className='p-2 border rounded-lg'
              >
                <option value='homepage'>Homepage</option>
                <option value='sidebar'>Sidebar</option>
                <option value='banner'>Banner</option>
                <option value='footer'>Footer</option>
              </select>
              <input
                type='number'
                placeholder='Priority'
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value)})}
                className='p-2 border rounded-lg'
              />
            </div>
            <div className='flex gap-2 mt-4'>
              <button type='submit' className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'>
                Create
              </button>
              <button type='button' onClick={() => setShowAdvertisementForm(false)} className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600'>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {advertisements.map(ad => (
            <div key={ad._id} className='border rounded-lg p-4'>
              <img src={ad.image} alt={ad.title} className='w-full h-32 object-cover rounded mb-2' />
              <h4 className='font-semibold'>{ad.title}</h4>
              <p className='text-sm text-gray-600'>{ad.description}</p>
              <span className='text-xs bg-red-100 text-red-800 px-2 py-1 rounded'>{ad.position}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Management */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-semibold'>Sliders</h3>
          <button
            onClick={() => setShowSliderForm(true)}
            className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
          >
            Add Slider
          </button>
        </div>
        
        {showSliderForm && (
          <form onSubmit={handleSubmitSlider} className='mb-6 p-4 border rounded-lg'>
            <h4 className='text-lg font-semibold mb-4'>Create Slider</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <input
                type='text'
                placeholder='Title'
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className='p-2 border rounded-lg'
                required
              />
              <input
                type='text'
                placeholder='Subtitle'
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                className='p-2 border rounded-lg'
                required
              />
              <input
                type='url'
                placeholder='Image URL'
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className='p-2 border rounded-lg'
                required
              />
              <input
                type='text'
                placeholder='Button Text'
                value={formData.buttonText}
                onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                className='p-2 border rounded-lg'
              />
              <input
                type='url'
                placeholder='Button Link'
                value={formData.buttonLink}
                onChange={(e) => setFormData({...formData, buttonLink: e.target.value})}
                className='p-2 border rounded-lg'
              />
              <input
                type='number'
                placeholder='Order'
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                className='p-2 border rounded-lg'
              />
            </div>
            <div className='flex gap-2 mt-4'>
              <button type='submit' className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'>
                Create
              </button>
              <button type='button' onClick={() => setShowSliderForm(false)} className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600'>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {sliders.map(slider => (
            <div key={slider._id} className='border rounded-lg p-4'>
              <img src={slider.image} alt={slider.title} className='w-full h-32 object-cover rounded mb-2' />
              <h4 className='font-semibold'>{slider.title}</h4>
              <p className='text-sm text-gray-600'>{slider.subtitle}</p>
              <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'>Order: {slider.order}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminAdvertisementManager
