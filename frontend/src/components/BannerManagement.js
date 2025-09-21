import React, { useState, useEffect } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const BannerManagement = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    position: '',
    title: '',
    subtitle: '',
    buttonText: '',
    link: '',
    image: null
  })

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      const response = await fetch(SummaryApi.getAdvertisements.url, {
        method: SummaryApi.getAdvertisements.method,
        credentials: 'include'
      })
      const data = await response.json()
      
      if (data.success) {
        setBanners(data.data)
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
      toast.error('Error fetching banners')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('position', formData.position)
      formDataToSend.append('title', formData.title)
      formDataToSend.append('subtitle', formData.subtitle)
      formDataToSend.append('buttonText', formData.buttonText)
      formDataToSend.append('link', formData.link)
      if (formData.image) {
        formDataToSend.append('image', formData.image)
      }

      const response = await fetch(SummaryApi.uploadAdvertisement.url, {
        method: SummaryApi.uploadAdvertisement.method,
        body: formDataToSend,
        credentials: 'include'
      })

      const data = await response.json()
      
      if (data.success) {
        toast.success('Banner uploaded successfully')
        setShowForm(false)
        setFormData({
          position: '',
          title: '',
          subtitle: '',
          buttonText: '',
          link: '',
          image: null
        })
        fetchBanners()
      } else {
        toast.error(data.message || 'Error uploading banner')
      }
    } catch (error) {
      console.error('Error uploading banner:', error)
      toast.error('Error uploading banner')
    }
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  if (loading) {
    return <div className="p-4">Loading banners...</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Banner Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Banner'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Banner</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Position</option>
                  <option value="homepage">Homepage</option>
                  <option value="home-decor">Home Decor</option>
                  <option value="home-furnishing">Home Furnishing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link
                </label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Upload Banner
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{banner.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{banner.subtitle}</p>
              <p className="text-xs text-gray-500 mb-2">Position: {banner.position}</p>
              <a
                href={banner.link}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                {banner.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BannerManagement
