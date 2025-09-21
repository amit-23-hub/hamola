import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { uploadFile } from '../utils/uploadUtils'

const CloudinaryUpload = ({ onImageUpload, className = '', preset = 'products' }) => {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const uploadToCloudinary = async (file) => {
    console.log('Starting upload:', { fileName: file.name, fileSize: file.size, fileType: file.type })
    
    setUploading(true)
    
    try {
      const result = await uploadFile(file, preset)
      console.log('Upload result:', result)
      
      if (result.success) {
        onImageUpload(result.url)
        toast.success('Image uploaded successfully')
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      uploadToCloudinary(file)
    } else {
      toast.error('Please select a valid image file')
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
      } ${className}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={uploading}
      />
      
      {uploading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-2"></div>
          <p className="text-gray-600">Uploading...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-gray-600 mb-2">
            Drag and drop an image here, or click to select
          </p>
          <p className="text-sm text-gray-500">
            Supports: JPG, PNG, GIF, WebP
          </p>
        </div>
      )}
    </div>
  )
}

export default CloudinaryUpload
