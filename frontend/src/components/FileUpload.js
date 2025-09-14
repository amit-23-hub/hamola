import React, { useState, useRef } from 'react'
import { FaUpload, FaTimes, FaSpinner, FaCheck } from 'react-icons/fa'
import { uploadFile, validateFile } from '../utils/uploadUtils'

const FileUpload = ({
  onUpload,
  onError,
  preset = 'products',
  accept = 'image/*',
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  className = '',
  disabled = false,
  showPreview = true,
  placeholder = 'Click to upload or drag and drop',
  buttonText = 'Upload',
  ...props
}) => {
  const fileInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewUrls, setPreviewUrls] = useState([])
  const [error, setError] = useState(null)

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    
    // Validate files
    for (const file of fileArray) {
      const validation = validateFile(file, { maxSize })
      if (!validation.isValid) {
        setError(validation.errors.join(', '))
        onError?.(validation.errors.join(', '))
        return
      }
    }

    setError(null)
    setUploading(true)

    // Create preview URLs
    if (showPreview) {
      const urls = fileArray.map(file => URL.createObjectURL(file))
      setPreviewUrls(urls)
    }

    try {
      if (multiple) {
        // Upload multiple files
        const { uploadMultipleFiles } = await import('../utils/uploadUtils')
        const result = await uploadMultipleFiles(fileArray, preset)
        
        if (result.success) {
          onUpload?.(result)
          setPreviewUrls([])
        } else {
          setError(result.error)
          onError?.(result.error)
        }
      } else {
        // Upload single file
        const result = await uploadFile(fileArray[0], preset)
        
        if (result.success) {
          onUpload?.(result)
          setPreviewUrls([])
        } else {
          setError(result.error)
          onError?.(result.error)
        }
      }
    } catch (err) {
      setError(err.message)
      onError?.(err.message)
    } finally {
      setUploading(false)
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
    
    if (disabled || uploading) return

    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleFileInputChange = (e) => {
    const files = e.target.files
    handleFileSelect(files)
  }

  const handleClick = () => {
    if (disabled || uploading) return
    fileInputRef.current?.click()
  }

  const removePreview = (index) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={`file-upload ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${uploading ? 'cursor-wait' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        {...props}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled || uploading}
        />

        <div className="space-y-2">
          {uploading ? (
            <div className="flex flex-col items-center space-y-2">
              <FaSpinner className="animate-spin text-2xl text-red-600" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <FaUpload className="text-3xl text-gray-400" />
              <p className="text-sm text-gray-600">{placeholder}</p>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                disabled={disabled}
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Preview Area */}
      {showPreview && previewUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => removePreview(index)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FileUpload
