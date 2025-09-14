import React, { useState } from 'react'
import { materials, colors, priceRanges, roomTypes } from '../helpers/productCategory'

const ProductFilters = ({ onFilterChange, filters, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value)
  }

  const handlePriceRangeChange = (range) => {
    onFilterChange('priceRange', range)
  }

  const handleMaterialChange = (material) => {
    const currentMaterials = filters.materials || []
    const newMaterials = currentMaterials.includes(material)
      ? currentMaterials.filter(m => m !== material)
      : [...currentMaterials, material]
    onFilterChange('materials', newMaterials)
  }

  const handleColorChange = (color) => {
    const currentColors = filters.colors || []
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color]
    onFilterChange('colors', newColors)
  }

  const handleRoomTypeChange = (roomType) => {
    const currentRoomTypes = filters.roomTypes || []
    const newRoomTypes = currentRoomTypes.includes(roomType)
      ? currentRoomTypes.filter(r => r !== roomType)
      : [...currentRoomTypes, roomType]
    onFilterChange('roomTypes', newRoomTypes)
  }

  const activeFiltersCount = (filters.materials?.length || 0) + 
                            (filters.colors?.length || 0) + 
                            (filters.roomTypes?.length || 0) + 
                            (filters.priceRange ? 1 : 0)

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-xl font-semibold text-gray-900'>Filters</h3>
        <div className='flex items-center gap-4'>
          {activeFiltersCount > 0 && (
            <span className='bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium'>
              {activeFiltersCount} active
            </span>
          )}
          <button
            onClick={onClearFilters}
            className='text-amber-600 hover:text-amber-700 font-medium text-sm'
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <button
        className='lg:hidden w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='font-medium'>Filter Products</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Price Range */}
        <div>
          <h4 className='font-semibold text-gray-900 mb-3'>Price Range</h4>
          <div className='space-y-2'>
            {priceRanges.map((range, index) => (
              <label key={index} className='flex items-center'>
                <input
                  type='radio'
                  name='priceRange'
                  checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
                  onChange={() => handlePriceRangeChange(range)}
                  className='mr-3 text-amber-600 focus:ring-amber-500'
                />
                <span className='text-gray-700'>{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div>
          <h4 className='font-semibold text-gray-900 mb-3'>Materials</h4>
          <div className='grid grid-cols-2 gap-2'>
            {materials.map((material, index) => (
              <label key={index} className='flex items-center'>
                <input
                  type='checkbox'
                  checked={filters.materials?.includes(material) || false}
                  onChange={() => handleMaterialChange(material)}
                  className='mr-2 text-amber-600 focus:ring-amber-500'
                />
                <span className='text-sm text-gray-700'>{material}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h4 className='font-semibold text-gray-900 mb-3'>Colors</h4>
          <div className='grid grid-cols-3 gap-2'>
            {colors.map((color, index) => (
              <label key={index} className='flex items-center'>
                <input
                  type='checkbox'
                  checked={filters.colors?.includes(color) || false}
                  onChange={() => handleColorChange(color)}
                  className='mr-2 text-amber-600 focus:ring-amber-500'
                />
                <span className='text-sm text-gray-700'>{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Room Types */}
        <div>
          <h4 className='font-semibold text-gray-900 mb-3'>Room Type</h4>
          <div className='space-y-2'>
            {roomTypes.map((room, index) => (
              <label key={index} className='flex items-center'>
                <input
                  type='checkbox'
                  checked={filters.roomTypes?.includes(room.value) || false}
                  onChange={() => handleRoomTypeChange(room.value)}
                  className='mr-3 text-amber-600 focus:ring-amber-500'
                />
                <span className='text-gray-700 flex items-center'>
                  <span className='mr-2'>{room.icon}</span>
                  {room.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Filters */}
        <div>
          <h4 className='font-semibold text-gray-900 mb-3'>Additional Filters</h4>
          <div className='space-y-2'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={filters.assemblyRequired || false}
                onChange={(e) => handleFilterChange('assemblyRequired', e.target.checked)}
                className='mr-3 text-amber-600 focus:ring-amber-500'
              />
              <span className='text-gray-700'>Assembly Required</span>
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={filters.inStock || false}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className='mr-3 text-amber-600 focus:ring-amber-500'
              />
              <span className='text-gray-700'>In Stock Only</span>
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={filters.onSale || false}
                onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                className='mr-3 text-amber-600 focus:ring-amber-500'
              />
              <span className='text-gray-700'>On Sale</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters
