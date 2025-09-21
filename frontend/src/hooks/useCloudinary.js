import { useState } from 'react'
import { toast } from 'react-toastify'
import { uploadFile, uploadMultipleFiles, deleteFile } from '../utils/uploadUtils'

export const useCloudinary = () => {
  const [uploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])

  const uploadImage = async (file, preset = 'products') => {
    if (!file) return null

    console.log('useCloudinary: Starting upload:', { fileName: file.name, fileSize: file.size, fileType: file.type, preset })
    setUploading(true)
    
    try {
      const result = await uploadFile(file, preset)
      console.log('useCloudinary: Upload result:', result)
      
      if (result.success) {
        const newImage = {
          id: result.public_id,
          url: result.url,
          width: result.width,
          height: result.height,
          format: result.format,
          uploadedAt: new Date().toISOString()
        }
        
        setUploadedImages(prev => [...prev, newImage])
        toast.success('Image uploaded successfully')
        return newImage
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('useCloudinary: Upload error:', error)
      toast.error('Failed to upload image: ' + error.message)
      return null
    } finally {
      setUploading(false)
    }
  }

  const uploadMultipleImages = async (files, preset = 'products') => {
    if (!files || files.length === 0) return []

    console.log('useCloudinary: Starting multiple upload:', { fileCount: files.length, preset })
    setUploading(true)
    
    try {
      const result = await uploadMultipleFiles(files, preset)
      console.log('useCloudinary: Multiple upload result:', result)
      
      if (result.success) {
        const newImages = result.successful.map(img => ({
          id: img.public_id,
          url: img.url,
          width: img.width,
          height: img.height,
          format: img.format,
          uploadedAt: new Date().toISOString()
        }))
        
        setUploadedImages(prev => [...prev, ...newImages])
        toast.success(`${result.successfulCount} images uploaded successfully`)
        return newImages
      } else {
        throw new Error(result.error || 'Multiple upload failed')
      }
    } catch (error) {
      console.error('useCloudinary: Multiple upload error:', error)
      toast.error('Failed to upload images: ' + error.message)
      return []
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (publicId) => {
    console.log('useCloudinary: Starting delete:', { publicId })
    
    try {
      const result = await deleteFile(publicId)
      console.log('useCloudinary: Delete result:', result)
      
      if (result.success) {
        setUploadedImages(prev => prev.filter(img => img.id !== publicId))
        toast.success('Image deleted successfully')
        return true
      } else {
        throw new Error(result.error || 'Delete failed')
      }
    } catch (error) {
      console.error('useCloudinary: Delete error:', error)
      toast.error('Failed to delete image: ' + error.message)
      return false
    }
  }

  const getImageUrl = (publicId, transformations = {}) => {
    const baseUrl = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your_cloud_name'}/image/upload`
    
    if (Object.keys(transformations).length === 0) {
      return `${baseUrl}/${publicId}`
    }

    const transformString = Object.entries(transformations)
      .map(([key, value]) => `${key}_${value}`)
      .join(',')

    return `${baseUrl}/${transformString}/${publicId}`
  }

  const clearUploadedImages = () => {
    setUploadedImages([])
  }

  return {
    uploading,
    uploadedImages,
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    getImageUrl,
    clearUploadedImages
  }
}
