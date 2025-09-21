import React, { useState } from 'react'

const ImageTest = () => {
  const [testUrl, setTestUrl] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const testImageUrl = 'https://res.cloudinary.com/dexlxvpvz/image/upload/v1758160341/furnicraft/products/r5pqjua7ig8dvfhdkoqz.jpg'

  const handleTestImage = () => {
    setTestUrl(testImageUrl)
    setImageLoaded(false)
    setImageError(false)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Display Test</h1>
      
      <div className="mb-4">
        <button 
          onClick={handleTestImage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Cloudinary Image
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Test URL:</label>
        <input
          type="text"
          value={testUrl}
          onChange={(e) => setTestUrl(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter image URL to test"
        />
      </div>

      {testUrl && (
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Image Preview:</h3>
          <div className="mb-2">
            <span className={`px-2 py-1 rounded text-sm ${
              imageLoaded ? 'bg-green-100 text-green-800' : 
              imageError ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'
            }`}>
              {imageLoaded ? '✅ Loaded' : imageError ? '❌ Error' : '⏳ Loading...'}
            </span>
          </div>
          <img
            src={testUrl}
            alt="Test image"
            className="max-w-full h-64 object-contain border"
            onLoad={() => {
              console.log('Image loaded successfully:', testUrl)
              setImageLoaded(true)
              setImageError(false)
            }}
            onError={(e) => {
              console.error('Image failed to load:', testUrl, e)
              setImageError(true)
              setImageLoaded(false)
            }}
          />
          <div className="mt-2 text-sm text-gray-600">
            <p><strong>URL:</strong> {testUrl}</p>
            <p><strong>Status:</strong> {imageLoaded ? 'Loaded successfully' : imageError ? 'Failed to load' : 'Loading...'}</p>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Information:</h3>
        <ul className="text-sm space-y-1">
          <li>• Check browser console for load/error events</li>
          <li>• Check Network tab for HTTP requests</li>
          <li>• Verify the URL is accessible</li>
          <li>• Check for CORS issues</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageTest
