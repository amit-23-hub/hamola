import React, { useState } from 'react'
import RoomVisualizer from '../components/RoomVisualizer'
import ProductFilters from '../components/ProductFilters'
import FurnitureProductCard from '../components/FurnitureProductCard'
import { roomTypes } from '../helpers/productCategory'

const RoomPlanner = () => {
  const [selectedRoom, setSelectedRoom] = useState('living-room')
  const [filters, setFilters] = useState({
    materials: [],
    colors: [],
    roomTypes: [],
    priceRange: null,
    assemblyRequired: false,
    inStock: false,
    onSale: false
  })
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleRoomSelect = (roomType) => {
    setSelectedRoom(roomType)
    setFilters(prev => ({
      ...prev,
      roomTypes: [roomType]
    }))
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      materials: [],
      colors: [],
      roomTypes: [],
      priceRange: null,
      assemblyRequired: false,
      inStock: false,
      onSale: false
    })
  }

  const handleSearchProducts = async () => {
    setIsLoading(true)
    // This would typically make an API call to fetch products based on filters
    // For now, we'll simulate with mock data
    setTimeout(() => {
      setProducts([]) // Mock empty for now
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Room Planner
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Visualize your space and discover the perfect furniture pieces for every room. 
            Plan, design, and shop with confidence.
          </p>
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Left Sidebar - Room Visualizer */}
          <div className='lg:col-span-1'>
            <RoomVisualizer 
              onRoomSelect={handleRoomSelect}
              selectedRoom={selectedRoom}
            />
          </div>

          {/* Right Side - Products */}
          <div className='lg:col-span-2'>
            {/* Filters */}
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />

            {/* Search Button */}
            <div className='mb-6'>
              <button
                onClick={handleSearchProducts}
                disabled={isLoading}
                className='w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50'
              >
                {isLoading ? 'Searching...' : 'Find Furniture for This Room'}
              </button>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className='grid md:grid-cols-2 gap-6'>
                {products.map((product) => (
                  <FurnitureProductCard
                    key={product._id}
                    product={product}
                    addToCart={() => {}} // This would be passed from parent
                  />
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <div className='text-6xl mb-4'>🪑</div>
                <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
                  Ready to Plan Your Room?
                </h3>
                <p className='text-gray-600 mb-6'>
                  Select a room type and apply filters to find the perfect furniture pieces.
                </p>
                <button
                  onClick={handleSearchProducts}
                  className='bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors'
                >
                  Browse All Furniture
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Room Design Tips */}
        <div className='mt-16 bg-white rounded-xl shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            Design Tips for Your {roomTypes.find(r => r.value === selectedRoom)?.label}
          </h2>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {getDesignTips(selectedRoom).map((tip, index) => (
              <div key={index} className='text-center'>
                <div className='text-4xl mb-4'>{tip.icon}</div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>{tip.title}</h3>
                <p className='text-gray-600'>{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Room Combinations */}
        <div className='mt-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            Popular Room Combinations
          </h2>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              { name: 'Modern Living', room: 'living-room', items: ['Sofa', 'Coffee Table', 'TV Stand'], price: '$2,499' },
              { name: 'Cozy Bedroom', room: 'bedroom', items: ['Bed', 'Dresser', 'Nightstand'], price: '$1,899' },
              { name: 'Elegant Dining', room: 'dining-room', items: ['Dining Table', 'Chairs', 'Sideboard'], price: '$3,299' },
              { name: 'Productive Office', room: 'office', items: ['Desk', 'Chair', 'Bookshelf'], price: '$1,599' }
            ].map((combo, index) => (
              <div key={index} className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow'>
                <div className='text-center mb-4'>
                  <div className='text-3xl mb-2'>
                    {roomTypes.find(r => r.value === combo.room)?.icon}
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900'>{combo.name}</h3>
                  <p className='text-2xl font-bold text-amber-600'>{combo.price}</p>
                </div>
                <ul className='space-y-2 mb-4'>
                  {combo.items.map((item, itemIndex) => (
                    <li key={itemIndex} className='text-sm text-gray-600 flex items-center'>
                      <span className='w-2 h-2 bg-amber-400 rounded-full mr-2'></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className='w-full bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors'>
                  View Collection
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get design tips based on room type
const getDesignTips = (roomType) => {
  const tips = {
    'living-room': [
      { icon: '🛋️', title: 'Seating Arrangement', description: 'Arrange seating to encourage conversation with a focal point like a fireplace or TV.' },
      { icon: '📏', title: 'Traffic Flow', description: 'Ensure clear pathways between furniture pieces for easy movement.' },
      { icon: '💡', title: 'Lighting Layers', description: 'Combine ambient, task, and accent lighting for a well-lit space.' }
    ],
    'bedroom': [
      { icon: '🛏️', title: 'Bed Placement', description: 'Position the bed against a wall, ideally not facing the door directly.' },
      { icon: '🗄️', title: 'Storage Solutions', description: 'Maximize storage with under-bed drawers and bedside tables.' },
      { icon: '🎨', title: 'Color Psychology', description: 'Use calming colors like blues and greens for better sleep.' }
    ],
    'dining-room': [
      { icon: '🍽️', title: 'Table Size', description: 'Allow 24 inches of space per person and 36 inches for walking around.' },
      { icon: '💺', title: 'Chair Comfort', description: 'Choose chairs that are comfortable for long conversations.' },
      { icon: '🪞', title: 'Mirror Magic', description: 'Add mirrors to make the space feel larger and brighter.' }
    ],
    'office': [
      { icon: '💼', title: 'Desk Position', description: 'Place desk near natural light but avoid direct glare on computer screen.' },
      { icon: '📚', title: 'Organization', description: 'Keep frequently used items within arm\'s reach for efficiency.' },
      { icon: '🌱', title: 'Personal Touch', description: 'Add plants and personal items to make the space inspiring.' }
    ]
  }
  
  return tips[roomType] || tips['living-room']
}

export default RoomPlanner
