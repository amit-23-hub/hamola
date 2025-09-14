import React, { useState } from 'react'
import { roomTypes } from '../helpers/productCategory'

const RoomVisualizer = ({ onRoomSelect, selectedRoom }) => {
  const [hoveredItem, setHoveredItem] = useState(null)

  const roomLayouts = {
    'living-room': {
      name: 'Living Room',
      icon: '🛋️',
      items: [
        { id: 1, name: 'Sofa', position: { x: 20, y: 30 }, icon: '🛋️' },
        { id: 2, name: 'Coffee Table', position: { x: 45, y: 50 }, icon: '☕' },
        { id: 3, name: 'TV Stand', position: { x: 20, y: 70 }, icon: '📺' },
        { id: 4, name: 'Armchair', position: { x: 70, y: 30 }, icon: '🪑' },
        { id: 5, name: 'Bookshelf', position: { x: 80, y: 20 }, icon: '📚' }
      ]
    },
    'bedroom': {
      name: 'Bedroom',
      icon: '🛏️',
      items: [
        { id: 1, name: 'Bed', position: { x: 30, y: 40 }, icon: '🛏️' },
        { id: 2, name: 'Dresser', position: { x: 60, y: 20 }, icon: '🪞' },
        { id: 3, name: 'Nightstand', position: { x: 20, y: 40 }, icon: '🛏️' },
        { id: 4, name: 'Wardrobe', position: { x: 80, y: 30 }, icon: '👔' },
        { id: 5, name: 'Chair', position: { x: 50, y: 70 }, icon: '🪑' }
      ]
    },
    'dining-room': {
      name: 'Dining Room',
      icon: '🍽️',
      items: [
        { id: 1, name: 'Dining Table', position: { x: 40, y: 40 }, icon: '🍽️' },
        { id: 2, name: 'Dining Chairs', position: { x: 30, y: 60 }, icon: '🪑' },
        { id: 3, name: 'Sideboard', position: { x: 20, y: 20 }, icon: '🗄️' },
        { id: 4, name: 'Chandelier', position: { x: 50, y: 10 }, icon: '💡' }
      ]
    },
    'office': {
      name: 'Office',
      icon: '💼',
      items: [
        { id: 1, name: 'Desk', position: { x: 30, y: 40 }, icon: '💼' },
        { id: 2, name: 'Office Chair', position: { x: 40, y: 50 }, icon: '🪑' },
        { id: 3, name: 'Bookshelf', position: { x: 70, y: 20 }, icon: '📚' },
        { id: 4, name: 'Filing Cabinet', position: { x: 20, y: 30 }, icon: '🗃️' },
        { id: 5, name: 'Lamp', position: { x: 50, y: 30 }, icon: '💡' }
      ]
    }
  }

  const currentRoom = roomLayouts[selectedRoom] || roomLayouts['living-room']

  return (
    <div className='bg-white rounded-lg shadow-lg p-6'>
      <h3 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
        Room Visualizer
      </h3>

      {/* Room Type Selector */}
      <div className='mb-6'>
        <h4 className='text-lg font-semibold text-gray-700 mb-3'>Select Room Type</h4>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
          {roomTypes.map((room) => (
            <button
              key={room.value}
              onClick={() => onRoomSelect(room.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedRoom === room.value
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'
              }`}
            >
              <div className='text-2xl mb-2'>{room.icon}</div>
              <div className='text-sm font-medium'>{room.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Room Layout */}
      <div className='mb-6'>
        <h4 className='text-lg font-semibold text-gray-700 mb-3'>
          {currentRoom.name} Layout
        </h4>
        <div className='relative bg-gray-100 rounded-lg h-80 border-2 border-dashed border-gray-300'>
          <div className='absolute inset-4 bg-white rounded-lg shadow-inner'>
            {currentRoom.items.map((item) => (
              <div
                key={item.id}
                className='absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group'
                style={{
                  left: `${item.position.x}%`,
                  top: `${item.position.y}%`
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className='text-2xl group-hover:scale-110 transition-transform'>
                  {item.icon}
                </div>
                {hoveredItem === item.id && (
                  <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap'>
                    {item.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Furniture Items List */}
      <div>
        <h4 className='text-lg font-semibold text-gray-700 mb-3'>
          Furniture in this room
        </h4>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
          {currentRoom.items.map((item) => (
            <div
              key={item.id}
              className='flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'
            >
              <span className='text-xl mr-3'>{item.icon}</span>
              <span className='text-sm font-medium text-gray-700'>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='mt-6 flex flex-col sm:flex-row gap-3'>
        <button className='flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors'>
          Shop for this Room
        </button>
        <button className='flex-1 border-2 border-amber-600 text-amber-600 py-3 px-6 rounded-lg font-semibold hover:bg-amber-50 transition-colors'>
          Save Layout
        </button>
      </div>
    </div>
  )
}

export default RoomVisualizer
