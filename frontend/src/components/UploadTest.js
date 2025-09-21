import React, { useState } from 'react'
import { toast } from 'react-toastify'
import CloudinaryUpload from './CloudinaryUpload'
import { useCloudinary } from '../hooks/useCloudinary'
import FileUpload from './FileUpload'

const UploadTest = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const { uploadImage, uploadMultipleImages, uploading } = useCloudinary()

  const handleCloudinaryUpload = (url) => {
    console.log('CloudinaryUpload callback:', url)
    setUploadedImages(prev => [...prev, { url, id: Date.now() }])
  }

  const handleFileUpload = (result) => {
    console.log('FileUpload callback:', result)
    if (result.success) {
      setUploadedImages(prev => [...prev, { url: result.url, id: result.public_id }])
    }
  }

  const handleFileError = (error) => {
    console.error('FileUpload error:', error)
    toast.error('Upload failed: ' + error)
  }

  const handleManualUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log('Manual upload starting:', file)
      const result = await uploadImage(file, 'products')
      console.log('Manual upload result:', result)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload Test Component</h1>
      
      {/* Test 1: CloudinaryUpload Component */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test 1: CloudinaryUpload Component</h2>
        <CloudinaryUpload 
          onImageUpload={handleCloudinaryUpload}
          preset="products"
          className="mb-4"
        />
      </div>

      {/* Test 2: FileUpload Component */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test 2: FileUpload Component</h2>
        <FileUpload 
          onUpload={handleFileUpload}
          onError={handleFileError}
          preset="products"
          multiple={false}
          className="mb-4"
        />
      </div>

      {/* Test 3: Manual Upload */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test 3: Manual Upload (useCloudinary hook)</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleManualUpload}
          className="mb-4 p-2 border rounded"
        />
        {uploading && <p className="text-blue-600">Uploading...</p>}
      </div>

      {/* Test 4: Multiple Upload */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test 4: Multiple Upload</h2>
        <FileUpload 
          onUpload={(result) => {
            console.log('Multiple upload result:', result)
            if (result.success) {
              result.successful.forEach(img => {
                setUploadedImages(prev => [...prev, { url: img.url, id: img.public_id }])
              })
            }
          }}
          onError={handleFileError}
          preset="products"
          multiple={true}
          className="mb-4"
        />
      </div>

      {/* Uploaded Images Display */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Uploaded Images ({uploadedImages.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {uploadedImages.map((img, index) => (
            <div key={img.id || index} className="relative group">
              <img
                src={img.url}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                <button
                  onClick={() => {
                    setUploadedImages(prev => prev.filter((_, i) => i !== index))
                  }}
                  className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Console Instructions */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Open browser DevTools (F12)</li>
          <li>Go to Console tab</li>
          <li>Try uploading images using any of the methods above</li>
          <li>Check console logs for detailed debugging information</li>
          <li>Look for errors in both frontend and backend console</li>
        </ol>
      </div>
    </div>
  )
}

export default UploadTest
