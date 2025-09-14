import React from 'react'
import { Link } from 'react-router-dom'

const AdvertisementCard = ({ advertisement, isAdmin = false, onEdit = null }) => {
  if (!advertisement) return null

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative'>
      {isAdmin && onEdit && (
        <button
          onClick={() => onEdit(advertisement)}
          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 z-10 text-xs"
          title="Edit Advertisement"
        >
          ✏️
        </button>
      )}
      <div className='relative'>
        <img
          src={advertisement.image}
          alt={advertisement.title}
          className='w-full h-32 object-cover'
        />
        {advertisement.badge && (
          <div className='absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold'>
            {advertisement.badge}
          </div>
        )}
      </div>
      
      <div className='p-3'>
        <h3 className='text-sm font-bold text-gray-900 mb-1'>{advertisement.title}</h3>
        <p className='text-gray-600 mb-2 text-xs line-clamp-2'>{advertisement.description}</p>
        
        {advertisement.price && (
          <div className='text-lg font-bold text-red-600 mb-2'>{advertisement.price}</div>
        )}
        
        <Link
          to={advertisement.link || '#'}
          className='inline-block bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-700 transition-colors'
        >
          {advertisement.buttonText || 'Learn More'}
        </Link>
      </div>
    </div>
  )
}

export default AdvertisementCard
