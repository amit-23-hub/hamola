import React, { useState } from 'react'
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const FurnitureCare = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const careInstructions = [
    {
      id: 'wood',
      title: 'Wood Furniture',
      icon: '🌳',
      materials: ['Oak', 'Pine', 'Walnut', 'Mahogany', 'Teak'],
      instructions: [
        'Dust regularly with a soft, dry cloth',
        'Use wood polish monthly to maintain shine',
        'Avoid direct sunlight to prevent fading',
        'Clean spills immediately with a damp cloth',
        'Use coasters for hot and cold drinks',
        'Apply furniture wax every 6 months for protection'
      ],
      tips: [
        'Test cleaning products on hidden areas first',
        'Use microfiber cloths for best results',
        'Avoid harsh chemicals and abrasive cleaners'
      ]
    },
    {
      id: 'fabric',
      title: 'Fabric Upholstery',
      icon: '🛋️',
      materials: ['Cotton', 'Linen', 'Wool', 'Synthetic', 'Leather'],
      instructions: [
        'Vacuum weekly with upholstery attachment',
        'Blot spills immediately with clean cloth',
        'Rotate cushions regularly for even wear',
        'Professional cleaning recommended annually',
        'Use fabric protector spray for new pieces',
        'Check care labels for specific instructions'
      ],
      tips: [
        'Test cleaning solutions on hidden areas',
        'Use gentle, circular motions when cleaning',
        'Allow to dry completely before using'
      ]
    },
    {
      id: 'metal',
      title: 'Metal Furniture',
      icon: '🔧',
      materials: ['Steel', 'Aluminum', 'Iron', 'Brass', 'Chrome'],
      instructions: [
        'Wipe with damp cloth and mild soap',
        'Dry immediately to prevent rust',
        'Apply metal polish for shine',
        'Check for rust spots regularly',
        'Use soft cloths to avoid scratching',
        'Store in dry areas when not in use'
      ],
      tips: [
        'Avoid abrasive cleaners on polished surfaces',
        'Apply car wax for extra protection',
        'Check hardware tightness regularly'
      ]
    },
    {
      id: 'glass',
      title: 'Glass Surfaces',
      icon: '🪟',
      materials: ['Tempered Glass', 'Regular Glass', 'Mirrors'],
      instructions: [
        'Clean with glass cleaner and lint-free cloth',
        'Wipe in circular motions for streak-free finish',
        'Use newspaper for extra shine',
        'Avoid ammonia-based cleaners on mirrors',
        'Clean edges carefully to prevent chipping',
        'Use microfiber cloths for best results'
      ],
      tips: [
        'Clean when cool to avoid streaks',
        'Use distilled water for spot-free cleaning',
        'Check for chips or cracks regularly'
      ]
    }
  ]

  const filteredInstructions = careInstructions.filter(instruction =>
    instruction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instruction.materials.some(material => 
      material.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Furniture Care Guide
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Keep your furniture looking beautiful for years to come with our comprehensive care instructions and tips.
          </p>
        </div>

        {/* Search */}
        <div className='max-w-2xl mx-auto mb-12'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search for materials or furniture types...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500'
            />
            <FaSearch className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
          </div>
        </div>

        {/* Care Instructions */}
        <div className='space-y-6'>
          {filteredInstructions.map((instruction) => (
            <div key={instruction.id} className='bg-white rounded-xl shadow-lg overflow-hidden'>
              <div 
                className='p-6 cursor-pointer hover:bg-gray-50 transition-colors'
                onClick={() => toggleExpanded(instruction.id)}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='text-4xl'>{instruction.icon}</div>
                    <div>
                      <h2 className='text-2xl font-bold text-gray-900'>{instruction.title}</h2>
                      <p className='text-gray-600'>
                        Materials: {instruction.materials.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className='text-2xl text-gray-400'>
                    {expandedItems[instruction.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
              </div>

              {expandedItems[instruction.id] && (
                <div className='px-6 pb-6 border-t border-gray-200'>
                  <div className='grid md:grid-cols-2 gap-8 pt-6'>
                    {/* Care Instructions */}
                    <div>
                      <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                        Care Instructions
                      </h3>
                      <ul className='space-y-3'>
                        {instruction.instructions.map((item, index) => (
                          <li key={index} className='flex items-start'>
                            <span className='w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0'></span>
                            <span className='text-gray-700'>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pro Tips */}
                    <div>
                      <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                        Pro Tips
                      </h3>
                      <ul className='space-y-3'>
                        {instruction.tips.map((tip, index) => (
                          <li key={index} className='flex items-start'>
                            <span className='w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0'></span>
                            <span className='text-gray-700'>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* General Care Tips */}
        <div className='mt-16 bg-amber-50 rounded-xl p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            General Furniture Care Tips
          </h2>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='text-5xl mb-4'>🌡️</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Temperature Control</h3>
              <p className='text-gray-600'>
                Keep furniture away from direct heat sources and maintain consistent room temperature.
              </p>
            </div>
            
            <div className='text-center'>
              <div className='text-5xl mb-4'>💧</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Humidity Management</h3>
              <p className='text-gray-600'>
                Use humidifiers or dehumidifiers to maintain optimal humidity levels (40-60%).
              </p>
            </div>
            
            <div className='text-center'>
              <div className='text-5xl mb-4'>🧹</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Regular Maintenance</h3>
              <p className='text-gray-600'>
                Establish a regular cleaning schedule to prevent dirt and grime buildup.
              </p>
            </div>
            
            <div className='text-center'>
              <div className='text-5xl mb-4'>🔧</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Hardware Check</h3>
              <p className='text-gray-600'>
                Tighten loose screws and bolts regularly to maintain structural integrity.
              </p>
            </div>
            
            <div className='text-center'>
              <div className='text-5xl mb-4'>📦</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Proper Storage</h3>
              <p className='text-gray-600'>
                Store furniture in dry, well-ventilated areas when not in use.
              </p>
            </div>
            
            <div className='text-center'>
              <div className='text-5xl mb-4'>👨‍🔧</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Professional Help</h3>
              <p className='text-gray-600'>
                Consult professionals for major repairs or restoration work.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Care */}
        <div className='mt-16 bg-red-50 rounded-xl p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            Emergency Care for Common Issues
          </h2>
          
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='bg-white rounded-lg p-6 shadow-md'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
                <span className='text-2xl mr-3'>💧</span>
                Water Damage
              </h3>
              <ul className='space-y-2 text-gray-700'>
                <li>• Blot excess water immediately</li>
                <li>• Use fans to circulate air</li>
                <li>• Remove cushions to dry separately</li>
                <li>• Contact professional if severe</li>
              </ul>
            </div>
            
            <div className='bg-white rounded-lg p-6 shadow-md'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
                <span className='text-2xl mr-3'>🖍️</span>
                Ink Stains
              </h3>
              <ul className='space-y-2 text-gray-700'>
                <li>• Blot with paper towels</li>
                <li>• Use rubbing alcohol on cotton</li>
                <li>• Test on hidden area first</li>
                <li>• Work from outside to center</li>
              </ul>
            </div>
            
            <div className='bg-white rounded-lg p-6 shadow-md'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
                <span className='text-2xl mr-3'>🔥</span>
                Heat Damage
              </h3>
              <ul className='space-y-2 text-gray-700'>
                <li>• Cool the area immediately</li>
                <li>• Use ice pack wrapped in cloth</li>
                <li>• Sand lightly if wood is affected</li>
                <li>• Apply wood conditioner</li>
              </ul>
            </div>
            
            <div className='bg-white rounded-lg p-6 shadow-md'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
                <span className='text-2xl mr-3'>🐛</span>
                Pest Damage
              </h3>
              <ul className='space-y-2 text-gray-700'>
                <li>• Identify the pest type</li>
                <li>• Use appropriate treatment</li>
                <li>• Clean affected areas thoroughly</li>
                <li>• Prevent future infestations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className='mt-16 text-center'>
          <div className='bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Need More Help?
            </h2>
            <p className='text-gray-600 mb-6'>
              Our furniture care experts are here to help you keep your pieces in perfect condition.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors'>
                Contact Support
              </button>
              <button className='border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors'>
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FurnitureCare
